import "../css/Navbar.css";

const Navbar = () => {
  return (
    <nav className="mui-appbar mui--z1">
      <div className="mui-container">
        <table width="100%">
          <tr className="mui--appbar-height">
            <td className="mui--text-title">Logo</td>
            <td className="mui--text-right">Icon</td>
          </tr>
        </table>
      </div>
    </nav>
  );
};

export default Navbar;
