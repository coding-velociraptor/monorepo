// import { Home } from 'components/domain/app/home'
import { AppLayout } from 'components/domain/app/Layout'
import React, { useEffect } from 'react'
import { SEO } from 'components/domain/seo'
import { Dashboard } from 'components/domain/app/dc7/dashboard'
import { useAccountContext } from 'context/account-context'
import { useRouter } from 'next/router'
import { sessionsAtom } from './_app'
import { useRecoilValue } from 'recoil'

const Index = (props: any) => {
  const sessions = useRecoilValue(sessionsAtom)
  const accountContext = useAccountContext()
  const router = useRouter()

  useEffect(() => {
    const storedSkipLogin = localStorage.getItem('skipLogin')

    if (storedSkipLogin !== 'true' && !accountContext.account) {
      router.replace('/login')
    }
  }, [])

  return (
    <AppLayout pageTitle="Dashboard" breadcrumbs={[{ label: 'Dashboard' }]}>
      <SEO title="Dashboard" />

      <Dashboard {...props} sessions={sessions} />
    </AppLayout>
  )
}

export default Index
