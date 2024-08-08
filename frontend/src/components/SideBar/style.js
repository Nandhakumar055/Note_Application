

import styled from 'styled-components'


export const SidebarMainContainer = styled.div`
    display : ${props => props.isMobileSize ? 'none' : 'inline'};
`