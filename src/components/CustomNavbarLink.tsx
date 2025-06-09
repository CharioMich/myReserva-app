import { NavbarLink } from "flowbite-react";
import { Link } from "react-router";

type Props = {
  to: string;
  text: string;
}

/**
 * Special component so we can get the functionality of Link (Router) but also keep the functionality and styling from NavbarLink (flowbite)
 */
const CustomNavbarLink = ({to, text}: Props) => {
  return (
    <NavbarLink className="text-white hover:text-gray-700"><Link className="block w-full" to={ to }>{ text }</Link></NavbarLink>
  )
}

export default CustomNavbarLink;