import {useState,useEffect} from "react";
// import {useEffect} from "react/index";
import {closeSidebar} from "../redux/featuries/sidebar/sidebarSlice";

export  function useResize(){
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== 'undefined') {
                setIsMobile(window.innerWidth <= 991);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return {isMobile}
}