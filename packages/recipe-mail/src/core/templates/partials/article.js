import Image from '../components/image';
import { H3, P } from '../components/typo';

const Article = ({ title }) => (
    <>
        <H3>H3 { title }</H3>
        <Image src="header.jpg" />
        <P>Description <strong>strong</strong></P>
    </>
);

export default Article;
