export interface IPhoto {
  id: number;
  url: string;
  isFeatured: boolean;
  propertyId: number;
}

export interface IProperty {
  id: number;
  title: string;
  description: string;
  location: string;
  contact: string;
  responsiblePerson: string;
  whatsappContact?: string;
  type: string;
  price: string;
  createdAt: string; 
  updatedAt: string;
  photos: IPhoto[];
  priceFormatted?: string
}
