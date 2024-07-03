import React, { forwardRef } from 'react';
import Barcode from 'react-barcode';

const BarcodeBahanBakuPage = forwardRef((props, ref) => {
    return (
        <div 
          className='print-area' 
          ref={ref}
          style={{ width: props.paperSize.a4.width, height: props.paperSize.a4.height }}
        >
          {props.attributes.map((attributes, index) => (
            <div className='barcode-items' key={index}>
              <p><strong>{attributes.name}</strong></p>
              <p>
                Price : {attributes.price }
              </p>
              <div className='barcode'>
                <Barcode value={attributes.sku} width={1} height={50} fontSize={10} />
              </div>
            </div>
          ))}
        </div>
    );
});

export default BarcodeBahanBakuPage;
