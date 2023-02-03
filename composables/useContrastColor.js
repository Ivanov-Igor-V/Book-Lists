export const useContrastColor = (hexcolor) => {
    if (!hexcolor) return;
    if (hexcolor[0] === "#") {
      hexcolor = hexcolor.substring(1);
    }
    const r = parseInt(hexcolor.substr(0, 2), 16);
    const g = parseInt(hexcolor.substr(2, 2), 16);
    const b = parseInt(hexcolor.substr(4, 2), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    if (isNaN(yiq)) return "purple";
    return yiq >= 128 ? "black" : "white";
  };

