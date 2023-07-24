export interface Data {
    pagination: Pagination
    facets: Facet[]
    products: Product[]
}

export interface Pagination {
    from: number
    size: number
    total: number
    sortType: number
}

export interface Facet {
    identifier: string
    displayName: string
    priority: number
    options: Option[]
    facetType: number
}

export interface Option {
    identifier: string
    value: any
    displayValue: string
    productCount?: number
    priority: number
    linkSlug?: string
    childOptions?: any[]
}

export interface Product {
    id: string
    legacyId?: string
    legacyVariantId?: string
    cultureCode: string
    isDefaultVariant: boolean
    sku: string
    productName: string
    slug: string
    averageRating?: number
    reviewsCount: number
    questionsCount: number
    image: Image
    stockStatus: StockStatus
    price: Price
    attributes: Attributes2
    defaultCategory: DefaultCategory
    brand: Brand
    score: number
}

export interface Image {
    externalId: string
    url: string
    priority: number
    isDefault: boolean
    attributes: Attributes
}

export interface Attributes {
    imageAltText: string
}

export interface StockStatus {
    status: string
    stockLevel?: number
}

export interface Price {
    currencyCode: string
    priceIncTax: number
    priceExcTax: number
    isOnPromotion: boolean
    wasPriceIncTax?: number
    wasPriceExcTax?: number
    discountPercentage?: number
    monthlyFinanceEstimate?: number
}

export interface Attributes2 {
    isApproved?: boolean
    isShownOnTv?: boolean
    isBestSeller?: boolean
    isFreeWaste?: boolean
    isPremium?: boolean
    isRecommended?: boolean
    isTrayIncluded?: boolean
    isBluetoothIncluded?: boolean
    isBatteryIncluded?: boolean
    isAntiSlipIncluded?: boolean
    isShortProjection?: boolean
    hasOneOutlet?: boolean
    hasTwoOutlets?: boolean
    hasThreeOutlets?: boolean
    isNew: boolean
    hasMoreOptions: boolean
    variationListingLabel?: string
}

export interface DefaultCategory {
    externalId: string
    slug: string
    name: string
    isDefault: boolean
    ancestors: Ancestor[]
}

export interface Ancestor {
    slug: string
    externalId: string
    name: string
    depth: number
}

export interface Brand {
    externalId: string
    slug: string
    name: string
    brandImage: BrandImage
}

export interface BrandImage {
    externalId: string
    url: string
    priority: number
    isDefault: boolean
    attributes: Attributes3
}

export interface Attributes3 {
    imageAltText: string
}

export type ProductTypes = "toilets" | "basins" | "baths" | "showers" | "taps"
export type SortTypes = "1" | "2" | "3" | "4"// 1 = recommended 2 = PriceLowToHight 3 = PriceHighToLow 4 = LargestDiscount 


export interface FacetFilter {
    type: string
    identifier: string
    value: any
}

export interface AppState {
    type: ProductTypes;
}