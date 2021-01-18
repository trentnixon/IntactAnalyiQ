import React from 'react';
import { Link } from 'react-router-dom';


const publicPath='demo'
const Nav=[
    {
        Name:"Home",
        To:`/${publicPath}`,
        icon:""
    },
    {
        Name:"About",
        To:`/${publicPath}/about`,
        icon:""
    },
    {
        Name:"Contact",
        To:`/${publicPath}/contact`,
        icon:""
    },
    {
        Name:"Login",
        To:`/${publicPath}/login`,
        icon:""
    }
]

const PublicNavigation = ()=>{
    return(
        <div className="PublicNav">
            <ul>
                {
                    Nav.map((nav,i)=>{
                        return(
                            <li>
                                <Link to={nav.To}>
                                    {nav.Name}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default PublicNavigation;