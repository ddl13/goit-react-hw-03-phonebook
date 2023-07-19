import PropTypes from 'prop-types';
import { SectionEl, Title } from './section.styled';

export function Section({title, children}) {
    return (
        <SectionEl>
            {title && (<Title>{title}</Title>)}
            {children}
        </SectionEl>
    );
};

Section.propTypes = {
    title: PropTypes.string, 
    children: PropTypes.node,
};