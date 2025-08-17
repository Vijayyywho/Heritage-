import React from 'react';
import { Helmet } from 'react-helmet-async';


interface SEOTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

const SEOTags: React.FC<SEOTagsProps> = ({
  title = "Heritage Rides 🚗 Car Tours in Udaipur | Sightseeing & Day Trips",
  description = "Explore Udaipur with Heritage Rides 🚗 Private car tours, sightseeing, and day trips with professional drivers. Book your Udaipur car rental today!",
  keywords = "Udaipur car tours, car rental Udaipur, sightseeing Udaipur, Udaipur day trips, Udaipur with driver, Heritage Rides",
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  twitterTitle,
  twitterDescription,
  twitterImage,
}) => {
  const defaultOgImage = "https://heritagerides.in/og-image.jpg";
  const defaultOgUrl = "https://heritagerides.in/";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Heritage Rides" />

      {/* Open Graph Tags */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage || defaultOgImage} />
      <meta property="og:url" content={ogUrl || defaultOgUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={twitterTitle || ogTitle || title} />
      <meta
        name="twitter:description"
        content={twitterDescription || ogDescription || description}
      />
      <meta name="twitter:image" content={twitterImage || ogImage || defaultOgImage} />
    </Helmet>
  );
};

export default SEOTags; 