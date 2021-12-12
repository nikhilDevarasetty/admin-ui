import { spinner_icon } from '../assets'

const Spinner = ({ classes='' }) => {
  return <img src={spinner_icon} alt='' className={`inline animate-spin ${classes}`} />
};

export default Spinner