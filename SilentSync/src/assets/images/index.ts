import {ImageSourcePropType} from 'react-native';

/**
 * Owl mascot logos — one per theme.
 *  - logo_midnight : line-art owl        -> Minimal Light
 *  - logo_ocean    : 8-bit pixel owl     -> Pixel Blue
 *  - logo_sand     : plush/felt owl      -> Soft Lavender
 *  - logo_aurora   : iridescent chrome   -> Holo Dark
 */
export const LogoMinimalLight: ImageSourcePropType = require('./logo_midnight.png');
export const LogoPixelBlue: ImageSourcePropType = require('./logo_ocean.png');
export const LogoSoftLavender: ImageSourcePropType = require('./logo_sand.png');
export const LogoHoloDark: ImageSourcePropType = require('./logo_aurora.png');

// Backwards-compatible aliases (match original repo export names).
export const LogoMidnight = LogoMinimalLight;
export const LogoOcean = LogoPixelBlue;
export const LogoSand = LogoSoftLavender;
export const LogoAurora = LogoHoloDark;
