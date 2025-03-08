const fontSet = ({
  size = 16, 
  weight = "normal", 
  lineHeight = "normal", 
  letterSpacing = "normal", 
  transform = "none",
  family = "Pretendard, sans-serif"
}) => `
  font-size: ${size}px;
  font-weight: ${weight};
  line-height: ${lineHeight};
  letter-spacing: ${letterSpacing};
  text-transform: ${transform};
  font-family: ${family};
`;

export default fontSet;
