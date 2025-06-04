interface Spacing {
  space_2: number;
  space_4: number;
  space_8: number;
  space_10: number;
  space_12: number;
  space_15: number;
  space_16: number;
  space_18: number;
  space_20: number;
  space_24: number;
  space_28: number;
  space_30: number;
  space_32: number;
  space_36: number;
}

export const SPACING: Spacing = {
  space_2: 2,
  space_4: 4,
  space_8: 8,
  space_10: 10,
  space_12: 12,
  space_15: 15,
  space_16: 16,
  space_18: 18,
  space_20: 20,
  space_24: 24,
  space_28: 28,
  space_30: 30,
  space_32: 32,
  space_36: 36,
};

interface Color {
  primaryRedHex: string;
  primaryOrangeHex: string;
  primaryBlackHex: string;
  primaryDarkGreyHex: string;
  secondaryDarkGreyHex: string;
  primaryGreyHex: string;
  secondaryGreyHex: string;
  primaryLightGreyHex: string;
  secondaryLightGreyHex: string;
  primaryWhiteHex: string;
  primaryBlackRGBA: string;
  secondaryBlackRGBA: string;
}

// export const COLORS: Color = {
//   primaryRedHex: '#D43C3C',             // Warmer, modern red
//   primaryOrangeHex: '#FF8A5C',          // Soft, inviting coffee orange
//   primaryBlackHex: '#1E1E1E',           // Modern black for backgrounds
//   primaryDarkGreyHex: '#2C2C2E',        // Clean dark grey for cards
//   secondaryDarkGreyHex: '#3A3A3C',      // Slightly lighter than primary dark
//   primaryGreyHex: '#5C5C5C',            // Refined neutral for text
//   secondaryGreyHex: '#737373',          // Secondary muted grey
//   primaryLightGreyHex: '#B5B5B5',       // Lighter touch for placeholders
//   secondaryLightGreyHex: '#D1D1D1',     // Near-white borders or icons
//   primaryWhiteHex: '#FAFAFA',           // Off-white for better contrast
//   primaryBlackRGBA: 'rgba(30,30,30,0.6)',  // Slightly softened black
//   secondaryBlackRGBA: 'rgba(0,0,0,0.5)',   // For subtle shadows
// };

export const COLORS: Color = {
  primaryRedHex: '#FF575C',              // Neon rose — for badges, like ❤️
  primaryOrangeHex: '#FFB26B',           // Peach-glow — modern call-to-action
  primaryBlackHex: '#0B0A0F',            // Deep obsidian black (main bg)
  primaryDarkGreyHex: '#16151D',         // Card & surface base
  secondaryDarkGreyHex: '#24222F',       // Secondary panel or nav background
  primaryGreyHex: '#6D6A75',             // Muted lilac grey (text labels)
  secondaryGreyHex: '#A6A2B2',           // Light metal grey (placeholders)
  primaryLightGreyHex: '#D9D5E1',        // Cloud pearl (lines, borders)
  secondaryLightGreyHex: '#F3F0F9',      // Lavender white (surface contrast)
  primaryWhiteHex: '#FCFBFF',            // Moon milk white (high contrast text)
  primaryBlackRGBA: 'rgba(11,10,15,0.7)', // For blur/glass panels
  secondaryBlackRGBA: 'rgba(0,0,0,0.45)', // Modals & hover states
};


interface FontFamily {
  poppins_black: string;
  poppins_bold: string;
  poppins_extrabold: string;
  poppins_extralight: string;
  poppins_light: string;
  poppins_medium: string;
  poppins_regular: string;
  poppins_semibold: string;
  poppins_thin: string;
}

export const FONTFAMILY: FontFamily = {
  poppins_black: 'Poppins-Black',
  poppins_bold: 'Poppins-Bold',
  poppins_extrabold: 'Poppins-ExtraBold',
  poppins_extralight: 'Poppins-ExtraLight',
  poppins_light: 'Poppins-Light',
  poppins_medium: 'Poppins-Medium',
  poppins_regular: 'Poppins-Regular',
  poppins_semibold: 'Poppins-SemiBold',
  poppins_thin: 'Poppins-Thin',
};

interface FontSize {
  size_8: number;
  size_10: number;
  size_12: number;
  size_14: number;
  size_16: number;
  size_18: number;
  size_20: number;
  size_24: number;
  size_28: number;
  size_30: number;
}

export const FONTSIZE: FontSize = {
  size_8: 10,   // For subtle tags, less used
  size_10: 12,  // Captions or micro-labels
  size_12: 14,  // Placeholders or secondary text
  size_14: 16,  // Paragraph or body
  size_16: 18,  // Section headings
  size_18: 20,  // Button labels / titles
  size_20: 22,  // Prominent titles
  size_24: 26,  // Card headers / section titles
  size_28: 30,  // Featured screen titles
  size_30: 32,  // Hero banners or modals
};


interface BorderRadius {
  radius_4: number;
  radius_8: number;
  radius_10: number;
  radius_15: number;
  radius_20: number;
  radius_25: number;
}

export const BORDERRADIUS: BorderRadius = {
  radius_4: 4,
  radius_8: 8,
  radius_10: 10,
  radius_15: 15,
  radius_20: 20,
  radius_25: 25,
};
