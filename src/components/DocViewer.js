import React from 'react';
import { useParams } from 'react-router-dom';
const DocViewer = () => {
  const { loc, doc, type } = useParams();

  const renderContent = () => {
    if (!doc) {
      return <img className="img-responsive" src="images/perfect-shiv-parvati.jpg" alt="Default" />;
    }

    // Construct file path safely
    const safeType = type === 'php' ? 'html' : type;
    const fullPath = `${process.env.PUBLIC_URL || ''}/${loc}/${doc}.${safeType}`;

    switch (type) {
      case 'pdf':
        return (
          <object data={fullPath} type="application/pdf" width="100%" style={{ height: '90vh', minHeight: '600px' }} aria-label="document viewer">
            <p>It appears you don't have a PDF plugin. 
               <a href={fullPath}>Click here to download the PDF.</a>
            </p>
          </object>
        );
      
      case 'mp4':
        return (
          <video width="100%" controls>
            <source src={fullPath} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        );

      case 'html':
      case 'php':
        return <iframe src={fullPath} title="Content" width="100%" style={{ minHeight: '100vh' }} frameBorder="0" />;

      default:
        return <img className="img-responsive" src="images/perfect-shiv-parvati.jpg" alt="Default" />;
    }
  };

  return (
    <div className="doc-viewer-page">
      <div className="row">
        <div className="col-md-12 whiteBG">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DocViewer;