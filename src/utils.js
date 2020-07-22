export const getFilteredProps = ({
  config = {},
  alt = '',
  className = '',
  src,
  sizes,
  width,
  height,
  params,
  ratio
}) => ({
  config,
  alt,
  className,
  src: src ? src : undefined,
  sizes: sizes ? sizes : undefined,
  imgNodeWidth: width,
  imgNodeHeight: height,
  params: params ? params : undefined,
  ratio: ratio ? ratio : undefined
});

export const getFilteredBgProps = ({
  // config = {},
  alt = '',
  className = '',
  // src,
  // sizes,
  // width,
  // height,
  // params,
  ...otherProps
}) => ({
  alt,
  className,
  ...otherProps
});
