import PropTypes from 'prop-types';

function Header({units, setUnits}) {

    return <>
        <div className="header">
            <ul>
                <li><button onClick={() => setUnits(units === "imperial" ? "metric" : "imperial")}>F / C</button></li>
            </ul>
        </div>
    </>
}   

export default Header;

// prop validation
Header.propTypes = {
    units: PropTypes.string.isRequired,
    setUnits: PropTypes.func.isRequired
}
