import { graphql } from "gatsby"
import React from "react"
import HCenterCol from "../components/h-center-col"
import ArrowLink from "../components/link/arrow-link"
import BaseLink from "../components/link/base-link"
import BlueButtonLink from "../components/link/blue-button-link"
import BlueLink from "../components/link/blue-link"
import { OUTLINE_CLS } from "../components/link/outline-rounded-button-link"
import { SECONDARY_BUTTON_CLS } from "../components/link/secondary-button-link"
import PostsPage from "../components/pages/posts-page"
import AvatarImageLarge from "../components/person/avatar-image-large"
import VCenterCol from "../components/v-center-col"
import VCenterRow from "../components/v-center-row"
import { EMAIL, GITHUB_URL } from "../constants"
import EnvelopeIcon from "../icons/envelope"
import GitHubIcon from "../icons/github"
import IDataPageProps from "../interfaces/data-page-props"
import ContentLayout from "../layouts/content-layout"
import Seo from "../layouts/seo"
import cn from "../lib/class-names"
import { getImageMap } from "../lib/images"
import { getPagePosts } from "../lib/paginate"
import { getAuthorBaseUrl } from "../lib/urls"

export default function Page({ data, location }: IDataPageProps) {
  const allPosts = data.allPosts.nodes
  const meImage = data.meImage
  const person = data.person
  const imageMap = getImageMap(data.postImages)
  const avatarMap = getImageMap(data.peopleImages)

  const posts = getPagePosts(allPosts)
  //const pages = getPageCount(allPosts)

  return (
    <ContentLayout title="Home" showCrumbs={false} location={location}>
      <></>
      <>
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2">
          <VCenterCol className="items-center gap-y-8">
            <BaseLink
              href={getAuthorBaseUrl("Antony Holmes")}
              ariaLabel="View profile"
            >
              <AvatarImageLarge
                author="Antony Holmes"
                className="h-64 w-64"
                avatarMap={avatarMap}
              />
            </BaseLink>

            {/*<VCenterRow className="justify-center text-sm font-semibold">
              <div className="flex flex-row gap-6">
                <BlueButtonArrowLink
                  href="/resume"
                  className="px-4 py-2"
                  text="Resume"
                />

                 <BlueLink
                  href="/publications"
                  className="flex flex-row items-center"
                >
                  Publications
                </BlueLink> 
              </div>
            </VCenterRow>*/}
          </VCenterCol>

          <VCenterCol className="gap-y-16 font-medium xl:py-16">
            <HCenterCol className="gap-y-5 text-lg">
              <h1 className="text-6xl font-extrabold">Hi There.</h1>

              <p className="text-center">
                I'm Antony Holmes, and welcome to my personal website. That's me
                in the photo, posing by the Hudson River for no particular
                reason.
              </p>

              <p className="text-center">
                I'm a developer and researcher in New York who learned how to do
                a few cool things with Java, Python, React, Gatsby, Next.js,
                Astro and other tech, some of which was used to make what your
                looking at now.
              </p>

              <p className="text-center">
                I made this site with love, mostly to try and get high{" "}
                <BlueLink href="https://pagespeed.web.dev/">
                  Lighthouse
                </BlueLink>{" "}
                scores and a pass on the{" "}
                <BlueLink href="https://validator.w3.org/">
                  Markup Validation Service
                </BlueLink>
                . I think I mostly succeeded.
              </p>

              <p className="text-center">
                I have an aptly named publications page where you can view all
                of the scientific literature I have written, primarily focused
                on cancer genetics.
              </p>

              <p className="text-center">
                My life story probably won't be optioned.
              </p>
            </HCenterCol>

            <div className="flex flex-col items-center justify-center gap-6  xl:flex-row">
              <BlueButtonLink
                href={`mailto:${EMAIL}`}
                className="w-full gap-x-2 rounded-lg border border-transparent fill-white px-4 py-2.5 font-semibold text-white xl:w-auto"
              >
                <EnvelopeIcon className="w-4" />
                <span>{EMAIL}</span>
              </BlueButtonLink>
              <ArrowLink
                href={GITHUB_URL}
                className={cn(
                  OUTLINE_CLS,
                  SECONDARY_BUTTON_CLS,
                  "w-full  rounded-lg stroke-slate-900 px-4 py-2.5 font-semibold xl:w-auto"
                )}
              >
                <VCenterRow className="gap-x-2">
                  <GitHubIcon className="w-4" />
                  <span>antonybholmes</span>
                </VCenterRow>
              </ArrowLink>
            </div>
          </VCenterCol>
        </div>
        <section className="mt-16 border-t border-slate-200 pt-16">
          <PostsPage
            posts={posts}
            page={1}
            pages={1}
            imageMap={imageMap}
            avatarMap={avatarMap}
          />
        </section>
      </>
      <></>
    </ContentLayout>
  )
}

export const Head = () => <Seo title="Home" />

export const pageQuery = graphql`
  query {
    allPosts: allMarkdownRemark(
      sort: { fields: { date: DESC } }
      filter: { fileAbsolutePath: { regex: "/posts/" } }
    ) {
      nodes {
        id
        excerpt(format: HTML)
        fields {
          date
          slug
        }
        frontmatter {
          title
          categories
          tags
          authors
          hero
        }
      }
    }

    postImages: allFile(filter: { absolutePath: { regex: "/images/posts/" } }) {
      nodes {
        absolutePath
        name
        childImageSharp {
          gatsbyImageData(
            width: 800
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }

    peopleImages: allFile(
      filter: { absolutePath: { regex: "/images/people/" } }
    ) {
      nodes {
        absolutePath
        name
        childImageSharp {
          gatsbyImageData(
            width: 240
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }

    meImage: file(
      name: { eq: "antony-holmes" }
      absolutePath: { regex: "/images/people/" }
    ) {
      childImageSharp {
        gatsbyImageData(
          width: 480
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }

    person: markdownRemark(
      id: { eq: "antony-holmes" }
      fileAbsolutePath: { regex: "/people/" }
    ) {
      id
      excerpt(format: HTML)
      html
      fields {
        slug
        date
      }
      frontmatter {
        name
        title
        email
        pubmed
      }
    }
  }
`
