import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
const NavBar = () => {
  return (
    <div className="navbar bg-blue text-black">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
     
    </div>

    <button className="btn btn-circle">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      />
  </svg>
  <Link href="/"> <AiOutlineHome/></Link>
 
</button>

  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    <li>
            {/* This is the new Link for the Analysis page */}
            <Link 
              href="/components/analysispage" 
              className="btn btn-ghost normal-case text-xl"
            >
              ANALYTICS
            </Link>
          </li>
     
      <li><Link href="/components/analysispage/monthdata/totalmonthdata" className="btn btn-ghost normal-case text-xl">MontData</Link></li>
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Button</a>
  </div>
</div>
  );
};

export default NavBar;
