export type AmenityIcon =
  | 'wifi'
  | 'parking'
  | 'kitchen'
  | 'heating'
  | 'tv'
  | 'terrace'
  | 'grill'
  | 'washer';

export interface Amenity {
  name: string;
  icon: AmenityIcon;
  /** Cambia a `true` SOLO las comodidades que la propiedad realmente tiene. */
  available: boolean;
}

/**
 * Ninguna comodidad está confirmada todavía, por eso todas parten en `false`.
 * Mientras todas estén en `false`, el sitio muestra una vista previa atenuada.
 */
export const amenities: Amenity[] = [
  { name: 'Wi-Fi', icon: 'wifi', available: false },
  { name: 'Estacionamiento', icon: 'parking', available: true},
  { name: 'Cocina equipada', icon: 'kitchen', available: true },
  { name: 'Calefacción', icon: 'heating', available: true },
  { name: 'TV', icon: 'tv', available: true },
  { name: 'Terraza', icon: 'terrace', available: false },
  { name: 'Parrilla', icon: 'grill', available: false },
  { name: 'Lavadora', icon: 'washer', available: true },
];
