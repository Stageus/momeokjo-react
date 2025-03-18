const fontSet = ({
  size = 16, 
  weight = "normal", 
  lineHeight = "normal", 
  letterSpacing = "normal", 
  transform = "none",
  family = "Pretendard, sans-serif",
  line = "none",
  color = "inherit",
  theme
}) => `
  font-size: ${size}px;
  font-weight: ${weight};
  line-height: ${lineHeight};
  letter-spacing: ${letterSpacing};
  text-transform: ${transform};
  font-family: ${family};
  text-decoration: ${line};
  color: ${theme?.[color] || color};
`;

export default fontSet;
