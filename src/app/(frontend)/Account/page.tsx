import { AccountStat } from './accountComponents/AccountStat/AccountStat'
import { BuysCard } from './accountComponents/BuysCard/BuysCard'
import { DataCard } from './accountComponents/DataCard/DataCard'

export default function AccountPage() {
  return (
    <div>
      <AccountStat />
      <div>
        <BuysCard />
        <DataCard />
      </div>
    </div>
  )
}
