import React from 'react';
import UploadFont from './UploadFont/UploadFont';
import FontList from './FontList/FontList';
import FontGroup from './FontGroup/FontGroup';
import ShowFontGroup from './ShowFontGroup/ShowFontGroup';

const Home = () => {
    return (
        <div>
             <UploadFont></UploadFont>
             <FontList></FontList>
             <FontGroup></FontGroup>
             <ShowFontGroup></ShowFontGroup>
        </div>
    );
};

export default Home;