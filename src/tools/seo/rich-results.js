// What Google could make of the page's JSON-LD, read as schema.org: the rich
// results it is eligible for (Google's documented ones, whatever outputs the
// markup), what each one lacks, and the search result they make
// (SearchResult.vue). An approximation: Google picks what it shows, and can
// show less; its Rich Results Test has the last word.

const SCHEMA = /^(https?:\/\/)?(www\.)?schema\.org\/|^schema:/i

const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value)

// a node's types, without their schema.org prefix
export const typesOf = node => (isObject(node) ? [].concat(node['@type'] ?? []).map(type => String(type).replace(SCHEMA, '')) : [])

const absolute = (href, base) => {
  if (!href) return null

  try {
    return new URL(href, base).href
  } catch {
    return null
  }
}

/* -------------------------------------------------------------------------- */
/* The graph                                                                  */
/* -------------------------------------------------------------------------- */

// Every typed node, nested ones included, an @id reference standing for the
// node it names (merged, where a node is split across blocks); `nested` the
// ones that are another node's property
function readGraph (roots) {
  const byId = new Map()

  const index = value => {
    if (Array.isArray(value)) return value.forEach(index)
    if (!isObject(value)) return

    if (value['@id'] && Object.keys(value).some(key => key !== '@id')) byId.set(value['@id'], { ...byId.get(value['@id']), ...value })
    Object.values(value).forEach(index)
  }

  roots.forEach(index)

  const resolve = value => (isObject(value) && value['@id'] && byId.has(value['@id']) ? byId.get(value['@id']) : value)
  const nodes = []
  const nested = new Set()
  const visited = new Set()

  const walk = (value, parent) => {
    if (Array.isArray(value)) return value.forEach(item => walk(item, parent))
    if (!isObject(value)) return

    const node = resolve(value)
    const typed = typesOf(node).length > 0

    if (typed && parent) nested.add(node)
    if (visited.has(node)) return

    visited.add(node)
    if (typed) nodes.push(node)

    Object.entries(node).forEach(([ key, child ]) => {
      if (key === '@graph') walk(child, parent)
      else if (!key.startsWith('@')) walk(child, typed ? node : parent)
    })
  }

  roots.forEach(root => walk(root, null))

  return {
    nodes, nested, resolve 
  }
}

/* -------------------------------------------------------------------------- */
/* The features                                                               */
/* -------------------------------------------------------------------------- */

const ARTICLE = [
  'Article',
  'NewsArticle',
  'BlogPosting',
  'Report',
  'ScholarlyArticle',
  'TechArticle',
  'AnalysisNewsArticle',
  'OpinionNewsArticle',
  'ReportageNewsArticle',
  'ReviewNewsArticle',
  'BackgroundNewsArticle',
  'AskPublicNewsArticle',
  'LiveBlogPosting'
]
const EVENT = [
  'Event',
  'BusinessEvent',
  'ChildrensEvent',
  'ComedyEvent',
  'CourseInstance',
  'DanceEvent',
  'DeliveryEvent',
  'EducationEvent',
  'ExhibitionEvent',
  'Festival',
  'FoodEvent',
  'Hackathon',
  'LiteraryEvent',
  'MusicEvent',
  'PublicationEvent',
  'SaleEvent',
  'ScreeningEvent',
  'SocialEvent',
  'SportsEvent',
  'TheaterEvent',
  'VisualArtsEvent'
]
const LOCAL_BUSINESS = [
  'LocalBusiness',
  'AccountingService',
  'Attorney',
  'AutomotiveBusiness',
  'BarOrPub',
  'Bakery',
  'BeautySalon',
  'CafeOrCoffeeShop',
  'ChildCare',
  'Dentist',
  'DryCleaningOrLaundry',
  'EmergencyService',
  'EmploymentAgency',
  'EntertainmentBusiness',
  'FinancialService',
  'FoodEstablishment',
  'GovernmentOffice',
  'HealthAndBeautyBusiness',
  'HomeAndConstructionBusiness',
  'Hotel',
  'LegalService',
  'Library',
  'LodgingBusiness',
  'MedicalBusiness',
  'Notary',
  'Physician',
  'ProfessionalService',
  'RealEstateAgent',
  'Restaurant',
  'SelfStorage',
  'ShoppingCenter',
  'SportsActivityLocation',
  'Store',
  'TouristInformationCenter',
  'TravelAgency'
]
const ORGANIZATION = [
  'Organization',
  'Airline',
  'Consortium',
  'Corporation',
  'EducationalOrganization',
  'FundingScheme',
  'GovernmentOrganization',
  'LibrarySystem',
  'MedicalOrganization',
  'NGO',
  'NewsMediaOrganization',
  'OnlineBusiness',
  'OnlineStore',
  'PerformingGroup',
  'PoliticalParty',
  'ResearchOrganization',
  'SportsOrganization',
  'WorkersUnion'
]
const SOFTWARE = [
  'SoftwareApplication',
  'MobileApplication',
  'WebApplication',
  'VideoGame' 
]

// the types whose ratings Google shows as stars; a business's own (an
// Organization, a LocalBusiness) rated on its own site is self-serving, and
// shows none
const REVIEWABLE = [
  'Book',
  'Course',
  'CreativeWorkSeason',
  'CreativeWorkSeries',
  'Episode',
  'Game',
  'MediaObject',
  'Movie',
  'MusicPlaylist',
  'MusicRecording',
  'Product',
  'Recipe',
  ...EVENT,
  ...SOFTWARE
]
const SELF_SERVING = [ ...ORGANIZATION, ...LOCAL_BUSINESS ]

// Each feature: the types that make it, where it shows (`result`: in the
// result itself; `elsewhere`, with `where`; `restricted` and `retired`: not for
// this site, with `note`), the properties it needs and those Google
// recommends ('a|b' one of them, 'a.b' a property's property), and what else
// to check. `standalone`: only a node that is not another's property.
// The first feature a node's types match is its own.
const FEATURES = [
  {
    name: 'Breadcrumb', types: [ 'BreadcrumbList' ], shows: 'result', required: [ 'itemListElement' ], check: checkBreadcrumb
  },
  {
    name: 'Site name', types: [ 'WebSite' ], shows: 'result', required: [ 'name' ], recommended: [ 'url', 'alternateName' ], check: checkWebSite
  },
  {
    name: 'Discussion forum',
    types: [ 'DiscussionForumPosting', 'SocialMediaPosting' ],
    shows: 'elsewhere',
    where: 'Discussions and forums',
    required: [
      'author',
      'datePublished',
      'text|image|video' 
    ],
    recommended: [
      'headline',
      'url',
      'interactionStatistic' 
    ]
  },
  {
    name: 'Article', types: ARTICLE, shows: 'result', recommended: [
      'headline',
      'image',
      'datePublished',
      'dateModified',
      'author.name' 
    ]
  },
  {
    name: 'Event',
    types: EVENT,
    shows: 'result',
    required: [
      'name',
      'startDate',
      'location' 
    ],
    recommended: [
      'description',
      'endDate',
      'eventStatus',
      'image',
      'offers',
      'organizer',
      'performer' 
    ],
    check: checkEvent
  },
  {
    name: 'Product',
    types: [
      'Product',
      'ProductGroup',
      'IndividualProduct',
      'ProductModel' 
    ],
    shows: 'result',
    required: [ 'name', 'offers|review|aggregateRating' ],
    recommended: [
      'image',
      'description',
      'brand.name',
      'sku|gtin|gtin8|gtin12|gtin13|gtin14|mpn',
      'offers.availability' 
    ],
    check: checkOffers
  },
  {
    name: 'Recipe',
    types: [ 'Recipe' ],
    shows: 'result',
    required: [ 'name', 'image' ],
    recommended: [
      'aggregateRating',
      'author',
      'datePublished',
      'description',
      'totalTime|cookTime',
      'prepTime',
      'recipeIngredient',
      'recipeInstructions',
      'recipeYield',
      'nutrition.calories' 
    ]
  },
  {
    name: 'Software app',
    types: SOFTWARE,
    shows: 'result',
    required: [
      'name',
      'offers.price',
      'aggregateRating|review' 
    ],
    recommended: [ 'applicationCategory', 'operatingSystem' ]
  },
  {
    name: 'Video', types: [ 'VideoObject' ], shows: 'result', required: [
      'name',
      'thumbnailUrl',
      'uploadDate' 
    ], recommended: [
      'description',
      'duration',
      'contentUrl|embedUrl' 
    ]
  },
  {
    name: 'Q&A',
    types: [ 'QAPage' ],
    shows: 'result',
    required: [
      'mainEntity.name',
      'mainEntity.answerCount',
      'mainEntity.acceptedAnswer|mainEntity.suggestedAnswer' 
    ],
    recommended: [
      'mainEntity.text',
      'mainEntity.author',
      'mainEntity.datePublished' 
    ]
  },
  {
    name: 'Review snippet', types: [ 'Review' ], standalone: true, shows: 'result', required: [
      'itemReviewed',
      'author',
      'reviewRating.ratingValue' 
    ], check: checkSelfServing
  },
  {
    name: 'Review snippet', types: [ 'AggregateRating' ], standalone: true, shows: 'result', required: [
      'itemReviewed',
      'ratingValue',
      'ratingCount|reviewCount' 
    ], check: checkSelfServing
  },
  {
    name: 'FAQ',
    types: [ 'FAQPage' ],
    shows: 'restricted',
    note: 'Shown only for well-known government and health sites (since 2023)',
    required: [ 'mainEntity' ],
    check: checkFaq
  },
  {
    name: 'Job posting',
    types: [ 'JobPosting' ],
    shows: 'elsewhere',
    where: 'Google for Jobs',
    required: [
      'title',
      'description',
      'datePosted',
      'hiringOrganization',
      'jobLocation|applicantLocationRequirements' 
    ],
    recommended: [
      'validThrough',
      'employmentType',
      'baseSalary',
      'identifier' 
    ],
    check: checkExpiry('validThrough', 'Expired: past its validThrough')
  },
  {
    name: 'Movie', types: [ 'Movie' ], shows: 'elsewhere', where: 'Movie carousels', required: [ 'name', 'image' ], recommended: [
      'aggregateRating',
      'dateCreated',
      'director',
      'review' 
    ]
  },
  {
    name: 'Course', types: [ 'Course' ], shows: 'elsewhere', where: 'Course lists (Course info is retired)', required: [ 'name', 'description' ], recommended: [ 'provider.name' ]
  },
  {
    name: 'Profile page', types: [ 'ProfilePage' ], shows: 'elsewhere', where: 'Perspectives and forum results', required: [ 'mainEntity.name' ], recommended: [
      'mainEntity.image',
      'mainEntity.sameAs',
      'dateCreated',
      'dateModified' 
    ]
  },
  {
    name: 'Dataset', types: [ 'Dataset' ], shows: 'elsewhere', where: 'Dataset Search', required: [ 'name', 'description' ], recommended: [
      'url',
      'license',
      'creator',
      'identifier' 
    ]
  },
  {
    name: 'Image metadata', types: [ 'ImageObject' ], standalone: true, shows: 'elsewhere', where: 'Google Images: the Licensable badge', required: [ 'contentUrl', 'license|creator|creditText|copyrightNotice' ], recommended: [ 'acquireLicensePage' ]
  },
  {
    name: 'Local business',
    types: LOCAL_BUSINESS,
    shows: 'elsewhere',
    where: 'the knowledge panel and Maps, after the Business Profile',
    required: [ 'name', 'address' ],
    recommended: [
      'url',
      'telephone',
      'geo',
      'openingHoursSpecification',
      'image',
      'priceRange' 
    ],
    check: checkOwnRatings
  },
  {
    name: 'Organization',
    types: ORGANIZATION,
    shows: 'elsewhere',
    where: 'the knowledge panel: name, logo, contacts',
    recommended: [
      'name',
      'url',
      'logo',
      'sameAs',
      'description' 
    ],
    check: checkOwnRatings
  },
  {
    name: 'How-to', types: [ 'HowTo' ], shows: 'retired', note: 'No longer shown (since 2023)'
  },
  {
    name: 'Claim review', types: [ 'ClaimReview' ], shows: 'retired', note: 'Phased out (2025)'
  },
  {
    name: 'Special announcement', types: [ 'SpecialAnnouncement' ], shows: 'retired', note: 'Phased out (2025)'
  },
  {
    name: 'Estimated salary', types: [ 'Occupation', 'OccupationAggregationByEmployer' ], shows: 'retired', note: 'Phased out (2025)'
  },
  {
    name: 'Vehicle listing', types: [ 'Car', 'Vehicle' ], shows: 'retired', note: 'Phased out (2025)'
  },
  {
    name: 'Book actions', types: [ 'Book' ], shows: 'retired', note: 'Phased out (2025); its ratings can still show'
  }
]

/* -------------------------------------------------------------------------- */
/* Reading values                                                             */
/* -------------------------------------------------------------------------- */

// The values at a path ('a.b'), through arrays and @id references
function valuesAt (graph, node, path) {
  return path.split('.').reduce((current, key) => current.flatMap(item => {
    const value = graph.resolve(item)?.[key]

    return value === undefined || value === null || value === '' ? [] : [].concat(value).map(graph.resolve)
  }), [ node ])
}

const has = (graph, node, path) => path.split('|').some(alternative => valuesAt(graph, node, alternative).length > 0)

// the first value at a path, or at the first of 'a|b' that has one
function first (graph, node, path) {
  for (const alternative of path.split('|')) {
    const [ value ] = valuesAt(graph, node, alternative)

    if (value !== undefined) return value
  }

  return undefined
}

// a plain value: a string or number as it is, else what an object stands for
const scalar = value => (isObject(value) ? value['@value'] ?? value.name ?? value.url ?? value.contentUrl ?? value['@id'] ?? null : value ?? null)
// an address: a string as it is, else the object's url
const urlOf = value => (isObject(value) ? value.url ?? value.contentUrl ?? value['@id'] ?? null : value ?? null)
const lastSegment = value => (value ? String(scalar(value)).split('/').pop() : null)
const missingOf = (graph, node, paths = []) => paths.filter(path => !has(graph, node, path)).map(path => path.split('|').join(' or '))
const isType = (node, types) => typesOf(node).some(type => types.includes(type))

/* -------------------------------------------------------------------------- */
/* Checks                                                                     */
/* -------------------------------------------------------------------------- */

function checkBreadcrumb (graph, node) {
  const items = valuesAt(graph, node, 'itemListElement')
  const missing = []

  items.forEach((item, index) => {
    if (!has(graph, item, 'name|item.name')) missing.push(`item ${index + 1}: name`)
    if (!has(graph, item, 'position')) missing.push(`item ${index + 1}: position`)
    // all but the last need their address
    if (index < items.length - 1 && !has(graph, item, 'item')) missing.push(`item ${index + 1}: item`)
  })

  return { missing }
}

function checkWebSite (graph, node) {
  const searchAction = valuesAt(graph, node, 'potentialAction').some(action => isType(action, [ 'SearchAction' ]))

  return {
    notes: [ 'Google reads the site name from the home page', ...(searchAction ? [ 'SearchAction: the sitelinks search box is no longer shown (since 2024)' ] : []) ]
  }
}

function checkEvent (graph, node) {
  const locations = valuesAt(graph, node, 'location')
  const placed = locations.some(location => (isType(location, [ 'VirtualLocation' ]) ? has(graph, location, 'url') : has(graph, location, 'address')))
  const missing = locations.length && !placed ? [ 'location.address (or a VirtualLocation url)' ] : []

  return { missing, ...checkExpiry('endDate|startDate', 'Ended: past events are dropped')(graph, node) }
}

function checkOffers (graph, node) {
  const missing = []

  valuesAt(graph, node, 'offers').forEach((offer, index) => {
    const label = `offers ${index + 1}`

    if (!has(graph, offer, 'price|lowPrice|priceSpecification.price')) missing.push(`${label}: price`)
    if (!has(graph, offer, 'priceCurrency|priceSpecification.priceCurrency')) missing.push(`${label}: priceCurrency`)
  })

  return { missing }
}

function checkFaq (graph, node) {
  const missing = []

  valuesAt(graph, node, 'mainEntity').forEach((question, index) => {
    if (!has(graph, question, 'name')) missing.push(`question ${index + 1}: name`)
    if (!has(graph, question, 'acceptedAnswer.text')) missing.push(`question ${index + 1}: acceptedAnswer.text`)
  })

  return { missing }
}

function checkExpiry (path, note) {
  return (graph, node) => {
    const date = new Date(scalar(first(graph, node, path)))

    return { notes: !isNaN(date) && date < new Date() ? [ note ] : [] }
  }
}

function checkSelfServing (graph, node) {
  const reviewed = first(graph, node, 'itemReviewed')

  return { notes: reviewed && isType(reviewed, SELF_SERVING) ? [ 'Self-serving: a business rating itself shows no stars' ] : [] }
}

function checkOwnRatings (graph, node) {
  return { notes: has(graph, node, 'aggregateRating|review') ? [ 'Self-serving: its own ratings show no stars' ] : [] }
}

// any rating on a node: what Google needs of it
function checkRatings (graph, node) {
  const missing = []

  valuesAt(graph, node, 'aggregateRating').forEach(rating => {
    if (!has(graph, rating, 'ratingValue')) missing.push('aggregateRating.ratingValue')
    if (!has(graph, rating, 'ratingCount|reviewCount')) missing.push('aggregateRating.ratingCount or reviewCount')
  })
  valuesAt(graph, node, 'review').forEach((review, index) => {
    if (!has(graph, review, 'author')) missing.push(`review ${index + 1}: author`)
    if (!has(graph, review, 'reviewRating.ratingValue')) missing.push(`review ${index + 1}: reviewRating.ratingValue`)
  })

  return { missing: [ ...new Set(missing) ] }
}

/* -------------------------------------------------------------------------- */
/* Formatting                                                                 */
/* -------------------------------------------------------------------------- */

function formatDate (value, lang, options = {
  day: 'numeric', month: 'short', year: 'numeric' 
}) {
  const date = new Date(scalar(value))

  if (isNaN(date)) return null

  try {
    return new Intl.DateTimeFormat(lang || undefined, options).format(date)
  } catch {
    return date.toDateString()
  }
}

function formatPrice (amount, currency, lang) {
  const number = Number(scalar(amount))

  if (!Number.isFinite(number)) return null
  if (number === 0) return 'Free'

  try {
    return new Intl.NumberFormat(lang || undefined, { style: 'currency', currency: scalar(currency) }).format(number)
  } catch {
    return `${number}${currency ? ` ${scalar(currency)}` : ''}`
  }
}

// ISO 8601 (PT1H5M30S) as minutes, or h:mm:ss for a video
function parseDuration (value) {
  const match = String(scalar(value) ?? '').match(/^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/)

  if (!match) return null

  const [
    , days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0 
  ] = match.map(Number)

  return ((days * 24 + hours) * 60 + minutes) * 60 + Math.round(seconds)
}

function formatMinutes (value) {
  const seconds = parseDuration(value)

  if (!seconds) return null

  const minutes = Math.round(seconds / 60)

  return minutes >= 60 ? `${Math.floor(minutes / 60)} h${minutes % 60 ? ` ${minutes % 60} min` : ''}` : `${minutes} min`
}

function formatClock (value) {
  const seconds = parseDuration(value)

  if (!seconds) return null

  const pad = number => String(number).padStart(2, '0')
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor(seconds / 60) % 60

  return hours ? `${hours}:${pad(minutes)}:${pad(seconds % 60)}` : `${minutes}:${pad(seconds % 60)}`
}

const AVAILABILITY = {
  InStock: 'In stock',
  OutOfStock: 'Out of stock',
  SoldOut: 'Sold out',
  PreOrder: 'Pre-order',
  PreSale: 'Presale',
  BackOrder: 'Backorder',
  LimitedAvailability: 'Limited availability',
  OnlineOnly: 'Online only',
  InStoreOnly: 'In store only',
  MadeToOrder: 'Made to order',
  Discontinued: 'Discontinued'
}

/* -------------------------------------------------------------------------- */
/* The result                                                                 */
/* -------------------------------------------------------------------------- */

// A rating as stars: { value, best, count, noun, by }
function ratingOf (graph, node) {
  const aggregate = isType(node, [ 'AggregateRating' ]) ? node : first(graph, node, 'aggregateRating')

  if (aggregate && has(graph, aggregate, 'ratingValue') && has(graph, aggregate, 'ratingCount|reviewCount')) {
    const reviews = has(graph, aggregate, 'reviewCount')

    return {
      value: Number(scalar(first(graph, aggregate, 'ratingValue'))),
      best: Number(scalar(first(graph, aggregate, 'bestRating'))) || 5,
      count: Number(scalar(first(graph, aggregate, reviews ? 'reviewCount' : 'ratingCount'))),
      noun: reviews ? 'reviews' : 'votes'
    }
  }

  const review = isType(node, [ 'Review' ]) ? node : first(graph, node, 'review')
  const rating = review && first(graph, review, 'reviewRating')

  if (rating && has(graph, rating, 'ratingValue')) return {
    value: Number(scalar(first(graph, rating, 'ratingValue'))),
    best: Number(scalar(first(graph, rating, 'bestRating'))) || 5,
    count: null,
    by: scalar(first(graph, review, 'author.name|author'))
  }

  return null
}

// The search result the page's JSON-LD makes, and its rich results
// ({ snippet, events, qa, features, issues }), from the blocks' data and what
// the report read besides: { doc, url, canonical, lang, og }
export function richResults (roots, {
  doc, url, canonical, lang, og 
}) {
  const graph = readGraph(roots)
  const base = canonical ?? url
  const issues = []

  // each node with its feature, checked
  const features = graph.nodes.flatMap(node => {
    const feature = FEATURES.find(item => isType(node, item.types) && (!item.standalone || !graph.nested.has(node)))

    if (!feature) return []

    const extra = feature.check?.(graph, node) ?? {}
    const ratings = checkRatings(graph, node)
    const missing = [
      ...missingOf(graph, node, feature.required),
      ...(extra.missing ?? []),
      ...ratings.missing 
    ]
    const status = missing.length && feature.shows !== 'retired' ? 'invalid' : feature.shows

    if (status === 'invalid') issues.push(`${feature.name}: missing ${missing.join(', ')}`)

    return [
      {
        name: feature.name,
        status,
        where: feature.where ?? null,
        note: feature.note ?? null,
        type: typesOf(node).join(', '),
        label: scalar(first(graph, node, 'name|headline')) ?? null,
        missing,
        recommended: status === 'retired' ? [] : missingOf(graph, node, feature.recommended),
        notes: extra.notes ?? [],
        node
      } 
    ]
  })

  const shown = features.filter(feature => feature.status === 'result')
  const firstShown = name => shown.find(feature => feature.name === name)?.node

  // the site's name and icon
  const website = graph.nodes.find(node => isType(node, [ 'WebSite' ]))
  const host = (() => {
    try {
      return new URL(base).host
    } catch {
      return ''
    }
  })()
  const siteName = scalar(website && first(graph, website, 'name')) ?? og['og:site_name'] ?? host
  const favicon = readFavicon(doc, url)

  if (!favicon.href) issues.push('No favicon link: Google falls back to /favicon.ico, else a globe')
  else if (!favicon.sized) issues.push('Favicon: Google wants an SVG or a square multiple of 48px')

  // the path, as breadcrumbs: the home left out, the domain standing for it
  const breadcrumb = firstShown('Breadcrumb')
  const home = absolute('/', base)
  const crumbs = breadcrumb
    ? valuesAt(graph, breadcrumb, 'itemListElement')
      .sort((a, b) => Number(scalar(a.position)) - Number(scalar(b.position)))
      .filter(item => absolute(urlOf(first(graph, item, 'item')), base) !== home)
      .map(item => scalar(first(graph, item, 'name|item.name')))
      .filter(Boolean)
    : null

  // what the result shows of the page's main thing, the first of these
  const primary = [
    'Product',
    'Recipe',
    'Software app',
    'Video',
    'Article' 
  ].map(firstShown).find(Boolean)
  const kind = primary && features.find(feature => feature.node === primary).name
  const details = []
  let date = null
  let image = null
  let video = null

  if (kind === 'Product') {
    const offer = first(graph, primary, 'offers')

    if (offer) {
      const currency = first(graph, offer, 'priceCurrency|priceSpecification.priceCurrency')
      const low = first(graph, offer, 'lowPrice')
      const high = first(graph, offer, 'highPrice')

      details.push(low !== undefined && high !== undefined
        ? `${formatPrice(low, currency, lang)} to ${formatPrice(high, currency, lang)}`
        : formatPrice(first(graph, offer, 'price|lowPrice|priceSpecification.price'), currency, lang))
      details.push(AVAILABILITY[lastSegment(first(graph, offer, 'availability'))])
    }
  }

  if (kind === 'Recipe') {
    details.push(formatMinutes(first(graph, primary, 'totalTime|cookTime')))

    const calories = scalar(first(graph, primary, 'nutrition.calories'))

    if (calories) details.push(/cal/i.test(calories) ? calories : `${calories} cal`)
  }

  if (kind === 'Software app') {
    const offer = first(graph, primary, 'offers')

    details.push(offer && formatPrice(first(graph, offer, 'price'), first(graph, offer, 'priceCurrency'), lang))
    details.push(scalar(first(graph, primary, 'operatingSystem')))
    details.push(lastSegment(first(graph, primary, 'applicationCategory'))?.replace(/Application$/, ''))
  }

  if (kind === 'Video') {
    video = {
      thumbnail: absolute(urlOf(first(graph, primary, 'thumbnailUrl')), base),
      duration: formatClock(first(graph, primary, 'duration'))
    }
    date = formatDate(first(graph, primary, 'uploadDate'), lang)
  }

  if (kind === 'Article') date = formatDate(first(graph, primary, 'datePublished'), lang)
  if (primary && kind !== 'Video') image = absolute(urlOf(first(graph, primary, 'image|thumbnailUrl')), base)

  // the stars: the main thing's, else any node Google rates; never a business's own
  const rated = [
    primary,
    ...graph.nodes.filter(node => isType(node, REVIEWABLE)),
    ...shown.filter(feature => feature.name === 'Review snippet' && !feature.notes.length).map(feature => feature.node)
  ].filter(node => node && !isType(node, SELF_SERVING))
  const rating = rated.map(node => ratingOf(graph, node)).find(Boolean) ?? null

  // the events, the first three by date
  const events = shown.filter(feature => feature.name === 'Event')
    .map(({ node }) => {
      const location = first(graph, node, 'location')

      return {
        start: scalar(first(graph, node, 'startDate')),
        date: formatDate(first(graph, node, 'startDate'), lang, {
          weekday: 'short', day: 'numeric', month: 'short' 
        }),
        name: scalar(first(graph, node, 'name')),
        place: location && (scalar(first(graph, location, 'name')) ?? scalar(first(graph, location, 'address.addressLocality|address')))
      }
    })
    .sort((a, b) => String(a.start).localeCompare(String(b.start)))

  // a question and its answer
  const qaPage = firstShown('Q&A')
  const qa = qaPage ? (() => {
    const question = first(graph, qaPage, 'mainEntity')
    const answer = first(graph, question, 'acceptedAnswer|suggestedAnswer')

    return {
      question: scalar(first(graph, question, 'name')),
      answers: Number(scalar(first(graph, question, 'answerCount'))) || null,
      answer: scalar(first(graph, answer, 'text')),
      accepted: has(graph, question, 'acceptedAnswer')
    }
  })() : null

  return {
    snippet: {
      siteName,
      favicon: favicon.href,
      host,
      crumbs: crumbs?.length ? crumbs : null,
      date,
      image,
      video,
      rating,
      details: details.filter(Boolean)
    },
    events: events.length ? { list: events.slice(0, 3), more: Math.max(0, events.length - 3) } : null,
    qa,
    // the nodes left out: page elements and loops have no place in a report
    features: features.map(({ node, ...feature }) => feature),
    issues
  }
}

// The icon Google would take: an SVG, else the largest declared; `sized`
// whether one is an SVG or a multiple of 48px, as Google asks
function readFavicon (doc, url) {
  const icons = [ ...doc.querySelectorAll('link[rel~="icon" i]') ].map(link => {
    const sizes = (link.getAttribute('sizes') ?? '').split(/\s+/).map(size => Number(size.split(/x/i)[0]) || 0)
    const svg = link.getAttribute('type') === 'image/svg+xml' || /\.svg(\?|$)/i.test(link.getAttribute('href') ?? '')

    return {
      href: absolute(link.getAttribute('href'), url), svg, size: Math.max(0, ...sizes) 
    }
  }).filter(icon => icon.href)

  const best = icons.find(icon => icon.svg) ?? [ ...icons ].sort((a, b) => b.size - a.size)[0]

  return { href: best?.href ?? null, sized: icons.some(icon => icon.svg || (icon.size && icon.size % 48 === 0)) }
}
