import { BlogReel } from 'components/domain/blog-overview'
import { pageHOC } from 'context/pageHOC'
import { GetBlogs } from 'services/blogs'
import { DEFAULT_APP_PAGE } from 'utils/constants'
import { getGlobalData } from 'services/global'
import { News } from 'components/domain/news'
import getNews from 'services/news'
import { Header } from 'components/common/layouts/header'
import { Footer } from 'components/common/layouts/footer'
import { Hero } from 'components/domain/index/hero'
import css from './index.module.scss'
import TrackList from 'components/domain/index/track-list'
import About from 'components/domain/index/about'
import FeaturedSpeakers from 'components/domain/index/featured-speakers'
import CallsToAction from 'components/domain/index/ctas'
import Image from 'next/legacy/image'
import ImageNew from 'next/image'
// import CircleBackground from 'assets/images/background-circles.png'
// import TriangleBackground from 'assets/images/background-triangles.png'
import { GetContentSections, GetTracks } from 'services/page'
// import TestExternalRepo from 'lib/components/lib-import'
import { useTina } from 'tinacms/dist/react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { client } from '../../tina/__generated__/client'
import { PagesQuery } from '../../tina/__generated__/types'
import TitleDevcon from 'assets/images/devcon-title.svg'
import LogoFlowers from 'assets/images/dc-7/logo-flowers.png'

export default pageHOC(function Index(props: any) {
  const { data }: { data: PagesQuery } = useTina(props.cms)

  return (
    <div className={css['layout-default']}>
      <Header withStrip withHero />
      <Hero />

      <div className="bg-white z-10 overflow-hidden w-full">
        <div className="section">
          <div className="flex mt-8 mb-8 pb-8 gap-8 border-bottom">
            <div>
              <TitleDevcon style={{ marginBottom: '24px' }} />
              <div className="rich-text">
                <TinaMarkdown content={data.pages.section1?.body}></TinaMarkdown>
              </div>
            </div>
            <div className="">
              <ImageNew src={LogoFlowers} alt="Devcon 7 Logo" />

              <div className="mt-2">
                <TitleDevcon style={{ width: '124px' }} />
                <p className="text-xl">เอเชียตะวันออกเฉียงใต้</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start mb-8 pb-8 border-bottom gap-8">
            <div>
              <div className="rich-text">
                <TinaMarkdown content={data.pages.section2?.top}></TinaMarkdown>
              </div>
            </div>
            <div className="flex gap-8">
              <div className="rich-text">
                <TinaMarkdown content={data.pages.section2?.left}></TinaMarkdown>
              </div>

              <div className="rich-text">
                <TinaMarkdown content={data.pages.section2?.right}></TinaMarkdown>
              </div>
            </div>
            <button className="button justify-self-start rounded-purple">{data.pages.section2?.button}</button>
          </div>

          <div className="flex flex-col items-start mb-8 pb-8 border-bottom gap-8">
            <div className="rich-text">
              <TinaMarkdown content={data.pages.section3?.body}></TinaMarkdown>
            </div>

            <button className="button justify-self-start rounded-purple">{data.pages.section3?.button}</button>
          </div>
        </div>
        {/* <About content={props.sections['devcon-about']} /> */}

        {/* <div className={`${css['background-container']} section`}>
          <div className={`${css['circle-background']} expand`}>
            <Image src={CircleBackground} alt="Circles" />
          </div>
        </div> */}

        {/* <About recap content={props.sections['devcon-recap']} /> */}

        {/* <FeaturedSpeakers /> */}

        {/* <CallsToAction
        scholarApplications={props.sections['cta-scholar-applications']}
        // speakerApplications={props.sections['cta-speaker-applications']}
        // ticketPresale={props.sections['cta-ticket-presale']}
        ticketsOnSale={props.sections['tickets-on-sale-now']}
      /> */}

        {/* <News data={props.news} /> */}

        {/* <div className="clear-bottom border-bottom"></div> */}

        <TrackList tracks={props.tracks} />

        <BlogReel blogs={props.blogs} />

        <div className="clear-bottom"></div>

        <Footer />
      </div>
    </div>
  )
})

export async function getStaticProps(context: any) {
  const globalData = await getGlobalData(context)
  const sections = await GetContentSections(
    [
      'devcon-about',
      'road-to-devcon-grants',
      'devcon-recap',
      'cta-speaker-applications',
      'cta-ticket-presale',
      'cta-scholar-applications',
      'tickets-on-sale-now',
    ],
    context.locale
  )
  const tracks = GetTracks(context.locale)

  const content = await client.queries.pages({ relativePath: 'Index.md' })

  return {
    props: {
      ...globalData,
      page: DEFAULT_APP_PAGE,
      news: await getNews(context.locale),
      blogs: await GetBlogs(),
      sections,
      tracks,
      cms: {
        variables: content.variables,
        data: content.data,
        query: content.query,
      },
    },
    revalidate: 1 * 60 * 30,
  }
}
