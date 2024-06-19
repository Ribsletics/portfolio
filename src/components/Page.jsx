import { StyledPage } from './page.style.js'
function Page ({ name, children }) {

  return (
    <StyledPage>
      <div className={`page-container ${name}`}>
        <h1>{name}</h1>
        {children}
      </div>
    </StyledPage>
  )
}

export default Page;