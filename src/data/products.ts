import type { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Professional Drill Set',
    description: 'Complete cordless drill set with multiple bits and rechargeable battery',
    price: 149.99,
    category: 'Power Tools',
    image: 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=600',
    features: [
      '20V lithium-ion battery',
      'Variable speed control',
      '15 drill bits included',
      'LED work light',
      'Carrying case included'
    ],
    specifications: {
      'Battery': '20V Li-ion',
      'Max Torque': '450 in-lbs',
      'Chuck Size': '1/2 inch',
      'Weight': '3.5 lbs'
    }
  },
  {
    id: '2',
    name: 'Heavy Duty Hammer',
    description: 'Forged steel claw hammer with ergonomic grip',
    price: 29.99,
    category: 'Hand Tools',
    image: 'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=600',
    features: [
      'Forged steel head',
      'Anti-slip rubber grip',
      'Precision balanced',
      'Curved claw design',
      'Shock-absorbing handle'
    ],
    specifications: {
      'Weight': '16 oz',
      'Handle Material': 'Fiberglass',
      'Length': '13 inches'
    }
  },
  {
    id: '3',
    name: 'Precision Screwdriver Set',
    description: '32-piece magnetic screwdriver set for electronics and detailed work',
    price: 24.99,
    category: 'Hand Tools',
    image: 'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=600',
    features: [
      '32 precision bits',
      'Magnetic tips',
      'Rotating cap for precision',
      'Storage case included',
      'Anti-static design'
    ],
    specifications: {
      'Pieces': '32',
      'Material': 'Chrome vanadium steel',
      'Case Type': 'Portable organizer'
    }
  },
  {
    id: '4',
    name: 'Circular Saw',
    description: 'Professional-grade 15-amp circular saw with laser guide',
    price: 189.99,
    category: 'Power Tools',
    image: 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=600',
    features: [
      '15-amp motor',
      'Laser cutting guide',
      '7-1/4 inch blade',
      'Bevel capacity 0-56 degrees',
      'Electric brake'
    ],
    specifications: {
      'Motor': '15 AMP',
      'Blade Size': '7-1/4 inch',
      'No Load Speed': '5,800 RPM',
      'Weight': '8.8 lbs'
    }
  },
  {
    id: '5',
    name: 'Adjustable Wrench Set',
    description: '3-piece professional adjustable wrench set',
    price: 39.99,
    category: 'Hand Tools',
    image: 'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=600',
    features: [
      'Chrome-plated finish',
      'Wide jaw capacity',
      'Laser-etched scale',
      'Non-slip grip',
      '3 sizes included'
    ],
    specifications: {
      'Sizes': '6", 8", 10"',
      'Material': 'Chrome vanadium steel',
      'Finish': 'Chrome plated'
    }
  },
  {
    id: '6',
    name: 'Impact Driver Kit',
    description: 'Brushless cordless impact driver with fast charger',
    price: 179.99,
    category: 'Power Tools',
    image: 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=600',
    features: [
      'Brushless motor',
      '1,500 in-lbs torque',
      '3-speed settings',
      'Quick-change chuck',
      'LED work light'
    ],
    specifications: {
      'Battery': '18V Li-ion',
      'Max Torque': '1,500 in-lbs',
      'Speed': '0-3,600 RPM',
      'Weight': '2.8 lbs'
    }
  }
];
