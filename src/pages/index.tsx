import { graphql } from "gatsby"
import React from "react"
import AvatarImageLarge from "../components/avatar-image-large"
import BaseCol from "../components/base-col"
import HCenterCol from "../components/h-center-col"
import BaseLink from "../components/link/base-link"
import BlueButtonArrowLink from "../components/link/blue-button-arrow-link"
import BlueLink from "../components/link/blue-link"
import ToBlueLink from "../components/link/to-blue-link"
import PostsPage from "../components/pages/posts-page"
import VCenterRow from "../components/v-center-row"
import { EMAIL } from "../constants"
import EnvelopeIcon from "../icons/envelope"
import LinkIcon from "../icons/link"
import IDataPageProps from "../interfaces/data-page-props"
import ContentLayout from "../layouts/content-layout"
import Seo from "../layouts/seo"
import { getPageCount, getPagePosts } from "../lib/paginate"

export default function Page({ data, location }: IDataPageProps) {
  const allPosts = data.allPosts.nodes

  const posts = getPagePosts(allPosts)
  //const pages = getPageCount(allPosts)

  return (
    <ContentLayout title="Home" showCrumbs={false} location={location}>
      <></>
      <div
        className="mb-32 grid grid-cols-1 gap-y-8 xl:grid-cols-4 xl:gap-x-16"
        slot="main"
      >
        <article className="rounded-xl bg-white p-8 xl:bg-transparent xl:p-0">
          <BaseCol className="items-center gap-y-8">
            <BaseLink href="/author/antony-holmes" ariaLabel="View profile">
              <AvatarImageLarge
                author={"Antony Holmes"}
                lazy={false}
                className="max-w-64"
              />
            </BaseLink>
            <BaseCol className="gap-y-2 text-sm ">
              <VCenterRow className="group gap-x-2 justify-center xl:justify-start">
                <EnvelopeIcon className="w-4 fill-slate-400 hidden xl:block transition-ani transition-transform group-hover:-translate-x-0.5" />
                <ToBlueLink href={`mailto:${EMAIL}`} underline={true}>
                  {EMAIL}
                </ToBlueLink>
              </VCenterRow>
              <VCenterRow className="group gap-x-2 justify-center xl:justify-start">
                <LinkIcon className="w-4 fill-slate-400 hidden xl:block transition-ani transition-transform group-hover:-translate-x-0.5" />
                <ToBlueLink
                  href="https://github.com/antonybholmes"
                  underline={true}
                >
                  github.com/antonybholmes
                </ToBlueLink>
              </VCenterRow>
            </BaseCol>
          </BaseCol>
        </article>
        <section className="col-span-3">
          <section>
            <HCenterCol>
              <h1 className="inline-block text-5xl font-bold">Hi There.</h1>

              <p className="mt-4 text-lg">
                I'm Antony Holmes. Welcome to my personal web site.
              </p>

              <p className="mt-4 text-lg">
                I'm a researcher and full stack developer with experience using
                Java, Python, React, Next.js, Astro and other tech, some of
                which was used to make this very site.
              </p>

              <p className="mt-4 text-lg">
                I have an aptly named publications page where you can view all
                of the scientific literature I have written, primarily focused
                on cancer genetics.
              </p>
            </HCenterCol>

            <VCenterRow className="justify-center mt-8">
              <div className="flex flex-row gap-6">
                <BlueButtonArrowLink
                  href="/resume"
                  className="px-4 py-2 font-bold text-sm"
                  text="Resume"
                />

                <BlueLink
                  href="/publications"
                  className="text-sm flex flex-row items-center"
                >
                  Publications
                </BlueLink>
              </div>
            </VCenterRow>
          </section>
          <section className="mt-16 border-t border-slate-200 pt-16">
            <PostsPage
              posts={posts}
              page={1}
              pages={1}
              showLatestPosts={true}
            />
          </section>
        </section>
      </div>
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
  }
`
