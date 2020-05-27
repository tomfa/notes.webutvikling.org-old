import React from "react"
import { Helmet } from "react-helmet"
import { useMeta } from "../hooks/use-meta"

export function MetaTags({
  description = "",
  lang = "en",
  meta = [],
  title = "",
} = {}) {
  const siteMeta = useMeta()
  const metaDescription = description || siteMeta.description
  const metaTitle = title || siteMeta.title

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={metaTitle}
      titleTemplate={`%s | ${siteMeta.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: metaTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: siteMeta.author,
        },
        {
          name: `twitter:title`,
          content: metaTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}
