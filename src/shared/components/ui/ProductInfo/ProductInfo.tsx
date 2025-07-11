'use client';

import React from 'react';

export interface ProductInfoProps {
  brand: string;
  name: string;
  price: number;
  size?: 'sm' | 'md' | 'lg';
}

export function ProductInfo({ brand, name, price, size = 'md' }: ProductInfoProps) {
  const priceText = `${price.toLocaleString()}원`;

  const sizeStyles = {
    sm: {
      brand: { fontSize: '12.8px', fontWeight: 300 }, // label-light
      name: { fontSize: '16px', fontWeight: 600 }, // title-semibold
      price: { fontSize: '12.8px', fontWeight: 600, color: '#FF5D8F' }, // body-xs-semibold + point color
    },
    md: {
      brand: { fontSize: '16px', fontWeight: 400 }, // title-regular
      name: { fontSize: '16px', fontWeight: 600 }, // body-semibold
      price: { fontSize: '16px', fontWeight: 600, color: '#FF5D8F' }, // body-semibold + point color
    },
    lg: {
      brand: { fontSize: '16px', fontWeight: 400 }, // title-regular
      name: { fontSize: '25px', fontWeight: 600 }, // head-semibold
      price: { fontSize: '20px', fontWeight: 600, color: '#FF5D8F' }, // title-semibold + point color
    },
  };

  const currentStyle = sizeStyles[size];

  return (
    <div className="flex flex-col">
      <span style={currentStyle.brand} className="text-gray-mid mb-1">
        {brand}
      </span>
      <span style={currentStyle.name} className="mb-2 truncate whitespace-nowrap overflow-hidden">
        {name}
      </span>
      <span style={currentStyle.price}>{priceText}</span>
    </div>
  );
}
