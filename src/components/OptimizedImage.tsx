interface ResponsiveSource {
  src: string;
  width: number;
}

interface OptimizedImageProps {
  src: string;
  webpSrc?: string;
  webpSrcSet?: ResponsiveSource[];
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
}

export const OptimizedImage = ({ 
  src, 
  webpSrc,
  webpSrcSet,
  alt, 
  className, 
  priority = false,
  width,
  height,
  sizes = "100vw"
}: OptimizedImageProps) => {
  // Build srcset string from responsive sources
  const buildSrcSet = (sources: ResponsiveSource[]) => {
    return sources.map(s => `${s.src} ${s.width}w`).join(", ");
  };

  return (
    <picture>
      {webpSrcSet && webpSrcSet.length > 0 && (
        <source 
          srcSet={buildSrcSet(webpSrcSet)} 
          sizes={sizes}
          type="image/webp" 
        />
      )}
      {webpSrc && !webpSrcSet && <source srcSet={webpSrc} type="image/webp" />}
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
      />
    </picture>
  );
};
