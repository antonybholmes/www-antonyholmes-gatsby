import { graphql } from "gatsby"
import React from "react"
import BaseCol from "../components/base-col"
import GatsbyBaseImage from "../components/gatsby-base-image"
import HCenterCol from "../components/h-center-col"
import BaseLink from "../components/link/base-link"
import BlueButtonArrowLink from "../components/link/blue-button-arrow-link"
import BlueLink from "../components/link/blue-link"
import ToBlueLink from "../components/link/to-blue-link"
import PostsPage from "../components/pages/posts-page"
import VCenterCol from "../components/v-center-col"
import VCenterRow from "../components/v-center-row"
import { EMAIL } from "../constants"
import EnvelopeIcon from "../icons/envelope"
import LinkIcon from "../icons/link"
import IDataPageProps from "../interfaces/data-page-props"
import ContentLayout from "../layouts/content-layout"
import Seo from "../layouts/seo"
import { getImageMap } from "../lib/images"
import { getPagePosts } from "../lib/paginate"
import { getAuthorUrl } from "../lib/urls"

export default function Page({ data, location }: IDataPageProps) {
  const allPosts = data.allPosts.nodes
  const meImage = data.meImage
  const imageMap = getImageMap(data.postImages)
  const avatarMap = getImageMap(data.peopleImages)

  const posts = getPagePosts(allPosts)
  //const pages = getPageCount(allPosts)

  return (
    <ContentLayout title="Home" showCrumbs={false} location={location}>
      <></>
      <>
        <div className="grid grid-cols-1 gap-y-4 xl:grid-cols-2 xl:gap-x-4">
          <VCenterCol className="h-full items-center gap-y-8 bg-stone-50 p-16">
            <BaseLink
              href={getAuthorUrl("Antony Holmes")}
              ariaLabel="View profile"
            >
              <div className="relative z-10 overflow-hidden rounded-full">
                <GatsbyBaseImage
                  src={meImage}
                  className="transition-ani h-56 w-56 transition-transform hover:scale-104"
                  alt="Antony Holmes"
                />
              </div>
            </BaseLink>
            <BaseCol className="gap-y-2">
              <VCenterRow className="group gap-x-2">
                <EnvelopeIcon className="hidden w-4 fill-slate-500 xl:block" />
                <ToBlueLink href={`mailto:${EMAIL}`}>{EMAIL}</ToBlueLink>
              </VCenterRow>
              <VCenterRow className="group  gap-x-2">
                <LinkIcon className="hidden w-4 fill-slate-500 xl:block" />
                <ToBlueLink href="https://github.com/antonybholmes">
                  github.com/antonybholmes
                </ToBlueLink>
              </VCenterRow>
            </BaseCol>
          </VCenterCol>

          <VCenterCol className="gap-y-16 bg-slate-50 p-16">
            <HCenterCol className="gap-y-4">
              <h1 className="text-5xl font-bold">Hi There.</h1>

              <p className="text-center text-lg">I'm Antony Holmes.</p>

              <p className="text-center text-lg">
                Welcome to my personal web site.
              </p>

              <p className="text-center text-lg ">
                I'm a full stack developer and researcher with experience using
                Java, Python, React, Gatsby, Next.js, Astro and other tech, some
                of which was used to make this very site.
              </p>

              <p className="text-center text-lg">
                I have an aptly named publications page where you can view all
                of the scientific literature I have written, primarily focused
                on cancer genetics.
              </p>
            </HCenterCol>

            <VCenterRow className="justify-center">
              <div className="flex flex-row gap-6">
                <BlueButtonArrowLink
                  href="/resume"
                  className="px-4 py-2 text-sm font-bold"
                  text="Resume"
                />

                <BlueLink
                  href="/publications"
                  className="flex flex-row items-center text-sm"
                >
                  Publications
                </BlueLink>
              </div>
            </VCenterRow>
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
          section
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
            width: 1024
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
            width: 320
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
  }
`
