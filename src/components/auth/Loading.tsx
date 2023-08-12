import { Spinner } from "react-bootstrap"

type Props = {}

const Loading = (props: Props) => {
  return (
    <>
      <div className="d-flex justify-content-center pt-10">
        <Spinner animation="border" variant="info" />
      </div>
    </>
  )
}

export default Loading
