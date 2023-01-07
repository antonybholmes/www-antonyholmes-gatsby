import { useEffect, useState } from "react"

import getBooleanSearch from "../lib/boolean-search"
import getJournalPublications from "../lib/pub/journal-publications"
import sortPublications from "../lib/pub/sort-publications"
import getTopAuthors from "../lib/pub/top-authors"
import getTopJournals from "../lib/pub/top-journals"
import SearchBar from "../components/search/searchbar"

//import BlueButton from "../link/blue-button"
import JournalFilter from "../components/publication/journal-filter"
import Publications from "../components/publication/publications"
import SortOrder from "../components/publication/sortby"

//import axios from "axios"
import BaseRow from "../components/base-row"

import VCenterRow from "../components/v-center-row"

import getAuthorPublications from "../lib/pub/author-publications"
import HCenterRow from "../components/h-center-row"
import Pagination from "../components/pagination"
import AuthorFilter from "../components/publication/author-filter"

import { RECORDS_PER_PAGE, TEXT_SHOW_MORE } from "../constants"
import SortIcon from "../icons/sort"
import ThreeQuarterLayout from "../layouts/three-quarter-layout"
import pubYearCount from "../lib/pub/pub-year-count"
import { getShortName } from "../lib/text"
import BaseCol from "../components/base-col"
import BlueRoundedButton from "../components/link/blue-rounded-button"
import ToggleSwitch from "../components/link/toggle-switch"
import PubRangeSlider from "../components/publication/pub-range-slider"
import React from "react"
import Seo from "../layouts/seo"
import { graphql } from "gatsby"
import IDataPageProps from "../interfaces/data-page-props"
import PubMedLink from "../components/publication/pubmed-link"
import HCenterCol from "../components/h-center-col"
import { getImageMap } from "../lib/images"
import ContentLayout from "../layouts/content-layout"
import IAuthor from "../interfaces/author"
import CompactAvatars from "../components/compact-avatars"

const EMPTY_QUERY = ""

//const RECORDS_PER_PAGE = [25, 50, 100, 200, 500, 1000]

export const PUB_API_URL = "/api/publications/lab.json"

function searchAuthors(q: string, publication: any) {
  for (let author of publication.authorList) {
    if (author.toLowerCase().includes(q)) {
      return true
    }
  }

  return false
}

export function search(query: any, publications: any[]): any[] {
  let ret: any = []

  let ql = query.text.toLowerCase()

  for (let publication of publications) {
    let found = false

    switch (query.field) {
      case "author":
        found = searchAuthors(ql, publication)
        break
      case "journal":
        found = publication.journal.toLowerCase() === ql
        break
      case "year":
        found = publication.year.toString() === ql
        break
      case "pmid":
        found = publication.pmid.toString() === ql
        break
      case "pmcid":
        found = publication.pmcid.toString() === ql
        break
      default:
        found = publication.pmid.toLowerCase().includes(ql)

        if (!found && publication.pmcid) {
          // try pmcid
          found = publication.pmcid.toLowerCase().includes(ql)
        }

        if (!found) {
          // try journal
          found = publication.title.toLowerCase().includes(ql)
        }

        if (!found) {
          // try journal
          found = publication.journal.toLowerCase().includes(ql)
        }

        if (!found) {
          // try authors
          found = searchAuthors(ql, publication)
        }

        // if (!found) {
        //   // try people
        //   for (let person of publication.peopleList) {
        //     //if (person.frontmatter.name.toLowerCase().includes(ql)) {
        //     if (person.toLowerCase().includes(ql)) {
        //       found = true
        //       break
        //     }
        //   }
        // }

        // if (!found) {
        //   // try id
        //   for (let person of publication.people) {
        //     if (person.frontmatter.personId.toLowerCase().includes(ql)) {
        //       found = true
        //       break
        //     }
        //   }
        // }

        if (!found) {
          // try year
          found = publication.year.toString().includes(ql)
        }

        break
    }

    if (found) {
      ret.push(publication)
    }
  }

  return ret
}

function booleanSearchAnd(s1: any, s2: any): any {
  const titles: Set<any> = new Set()

  s2.map((publication: any) => {
    titles.add(publication.title)
  })

  return s1.filter((publication: any) => {
    return titles.has(publication.title)
  })
}

function booleanSearchOr(s1: any, s2: any): any {
  const pubMap: any = {}

  s1.map((publication: any) => {
    if (!(publication.year in pubMap)) {
      pubMap[publication.year] = {}
    }

    if (!(publication.month in pubMap[publication.year])) {
      pubMap[publication.year][publication.month] = {}
    }

    pubMap[publication.year][publication.month][publication.title] = publication
  })

  s2.map((publication: any) => {
    if (!(publication.year in pubMap)) {
      pubMap[publication.year] = {}
    }

    if (!(publication.month in pubMap[publication.year])) {
      pubMap[publication.year][publication.month] = {}
    }

    if (!(publication.title in pubMap[publication.year][publication.month])) {
      pubMap[publication.year][publication.month][publication.title] =
        publication
    }
  })

  const ret = []

  for (let year of Object.keys(pubMap).sort().reverse()) {
    for (let month of Object.keys(pubMap[year]).sort().reverse()) {
      for (let title of Object.keys(pubMap[year][month])) {
        ret.push(pubMap[year][month][title])
      }
    }
  }

  return ret
}

function results(search: string, page: number, filteredPublications: any[]) {
  if (filteredPublications.length === 0) {
    return `Your search for ${getShortName(search)} retrieved no results`
  }

  const x = page + 1
  const y = filteredPublications.length
  const suffix = filteredPublications.length !== 1 ? "results" : "result"

  if (y > x) {
    return `Page ${x} of ${y} ${suffix}`
  } else {
    return `${y} ${suffix}`
  }
}

export default function Page({ data, location }: IDataPageProps) {
  const authors = data.people.nodes
  const avatarMap = getImageMap(data.peopleImages)

  return (
    <ContentLayout title="People" showTitle={false} location={location}>
      <></>
      <ul>
        {authors.map((author: IAuthor, index: number) => {
          return (
            <li key={index}>
              <CompactAvatars
                authors={[author.frontmatter.name]}
                avatarMap={avatarMap}
              />
            </li>
          )
        })}
      </ul>
    </ContentLayout>
  )
}

export const Head = () => <Seo title="People" />

export const pageQuery = graphql`
  query {
    people: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/people/" } }
    ) {
      nodes {
        id
        excerpt(format: HTML)
        fields {
          date
          slug
        }
        frontmatter {
          name
          title
          email
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
            width: 160
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  }
`
