import React, { useState } from 'react'
import { Container, Row, Col, Card, CardHeader, CardBody, Button, ListGroup, Form, FormGroup, Input, Media, Modal, ModalHeader, ModalBody, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'
import Link from 'next/link'
import Img from 'next/image'
import { dataMesa } from './dto/dto'
import data from '../../assets/images/mesa.png'
import ViewModal from './modal'
import { IMesa } from './interface/mesa'
const Mesas = (): any => {
  const [layoutColumns, setLayoutColumns] = useState(3);
  const [option, setOption] = useState('UNDEFINED')
  const [mesa, setMesa] = useState<IMesa | any>()

  const RenderOption: any = {
    viewDetails: <ViewModal
      close={() => setOption('UNDEFINED')}
      data={mesa}
    />,
    UNDEFINED: undefined
  }
  return (<>
    <Row className="gridRow">
      {dataMesa && dataMesa.map((item, key) => (
        <div className={'col-xl-2 col-sm-4 xl-2 col-6'} key={key}>
          <Card>
            <div className="product-box">
              <div className="product-img">
                <Img className="img-fluid" src={data} alt="" />
                {/* <ShoppingCart className='center' /> */}
                <div className="product-hover">
                  <ul>
                    {/* <li>
                      <Link href={`${process.env.PUBLIC_URL}/app/ecommerce/cart`}>
                        <Button color="default"
                        // onClick={() => addcart(item, quantity)}
                        >
                          <i className="icon-shopping-cart"></i>
                        </Button>
                      </Link>
                    </li> */}
                    <li
                      onClick={() => { setOption('viewDetails'), setMesa(item) }}
                    >
                      <Button color="default" data-toggle="modal"  >
                        <i className="icon-eye"></i>
                      </Button>
                    </li>
                    {/* <li>
                      <Link href={`${process.env.PUBLIC_URL}/app/ecommerce/wishlist`}>
                        <Button color="default"
                        // onClick={() => addWishList(item)}
                        >
                          <i className="icon-heart"></i>
                        </Button>
                      </Link>
                    </li> */}
                  </ul>
                </div>

              </div>
              <div className="product-details">

                <h4
                  //  onClick={() => onClickDetailPage(item)}
                  className="font-primary" >{item.name}</h4>
                <p>{item.note}</p>
                <div className="product-price">
                  {/* {symbol} */}
                  S/  {item.price}


                </div>
              </div>
            </div>
          </Card >
        </div >
      ))}

    </Row>
    {
      RenderOption[option]
    }
  </>


  )

}


export { Mesas }
