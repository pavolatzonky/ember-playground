'use strict';
const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    colors: {
      black: colors.black,
      white: colors.white,
      transparent: colors.transparent,
      grey: {
        '1': '#f1f1f1',
        '2': '#d6d6d6',
        '3': '#9c9c9c',
        '4': '#666666',
        '5': '#242424',
      },
      yellow: {
        light: '#ffc64a',
        base: '#faa61a',
        dark: '#dc9013',
      },
      teal: {
        light: '#d7f0f2',
        base: '#37b4be',
        dark: '#277e85',
      },
      orange: {
        base: '#e75637',
      },
      green: '#4fbf5b',
      red: '#ed1c24',
      purple: '#9129da',

      rentier: {
        // will be removed later
        'medium-gray': '#4c4c4c',
        'dark-gray': '#484848',
        'darker-gray': '#242424',
        'darkest-gray': '#0d0d0d',
        'light-highlight': '#b7975c',
        'dark-highlight': '#7d613d',
        disabled: '#979797',
        'disabled-highlight': '#544C3E',
      },
    },
    cursor: {
      auto: 'auto',
      default: 'default',
      pointer: 'pointer',
      wait: 'wait',
      text: 'text',
      move: 'move',
      'not-allowed': 'not-allowed',
      help: 'help',
    },
    boxShadow: {
      base: '0 0.125rem 1.5rem 0 rgba(0, 0, 0, 0.1)',
      active: '0 0.375rem 1.5rem 0 rgba(0, 0, 0, 0.2)',
      glow: '0px 2px 24px rgba(20, 190, 160, 0.1)',
      none: 'none',
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      serif: ['Roboto Slab', 'serif'],
    },
    fontSize: {
      '2xs': '.6875rem' /* 11px */,
      xs: '.75rem' /* 12px */,
      sm: '.875rem' /* 14px */,
      base: '1rem' /* 16px from app/styles/modules/base/typography.css */,
      lg: '1.125rem' /* 18px */,
      xl: '1.25rem' /* 20px */,
      '2xl': '1.5rem' /* 24px */,
      '3xl': '2rem' /* 32px */,
      '4xl': '2.5rem' /* 48px */,
      inherit: 'inherit',
    },
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
    },
    extend: {
      inset: {
        '0.25': '.25rem',
        '1': '1rem',
      },
      margin: {
        '-px-2': '-2px',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  variants: {
    borderWidth: ['responsive', 'hover'],
    textDecoration: ['responsive', 'hover', 'focus', 'disabled'],
    cursor: ['responsive', 'disabled'],
    opacity: [
      'responsive',
      'hover',
      'focus',
      'active',
      'group-hover',
      'disabled',
    ],
    margin: ['responsive', 'last'],
  },
  plugins: [],
};
