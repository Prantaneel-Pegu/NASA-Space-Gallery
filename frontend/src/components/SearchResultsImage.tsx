type Props = {
    src: string,
    alt: string,
    classes: string
}

function SearchResultsImage (props: Props) {
    const src = props.src;
    const alt = props.alt;
    const classes = props.classes;

    return (<img src={src} alt={alt} className={classes} />)
}

export default SearchResultsImage;