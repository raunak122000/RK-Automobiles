import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import { getAllCars } from '../redux/actions/carsActions';
import { Col, Row, Input, DatePicker, Card, Rate } from 'antd';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import moment from 'moment';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import carImage1 from '../images/car1.jpg';
import carImage2 from '../images/car2.jpg';
import carImage3 from '../images/car3.jpg';

const { RangePicker } = DatePicker;
const { Search } = Input;

const { Meta } = Card;

function Home() {
    const { cars } = useSelector(state => state.carsReducer);
    const { loading } = useSelector(state => state.alertsReducer);
    const [totalCars, setTotalcars] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCars());
    }, []);

    useEffect(() => {
        setTotalcars(cars);
    }, [cars]);

    const handleSearch = (value) => {
        const filteredCars = cars.filter(car => car.name.toLowerCase().includes(value.toLowerCase()));
        setTotalcars(filteredCars);
    };

    const setFilter = (values) => {
        var selectedFrom = moment(values[0], 'MMM DD yyyy HH:mm');
        var selectedTo = moment(values[1], 'MMM DD yyyy HH:mm');
        var temp = [];

        for (var car of cars) {
            if (car.bookedTimeSlots.length === 0) {
                temp.push(car);
            } else {
                for (var booking of car.bookedTimeSlots) {
                    if (
                        selectedFrom.isBetween(booking.from, booking.to) ||
                        selectedTo.isBetween(booking.from, booking.to) ||
                        moment(booking.from).isBetween(selectedFrom, selectedTo) ||
                        moment(booking.to).isBetween(selectedFrom, selectedTo)
                    ) {
                    } else {
                        temp.push(car);
                    }
                }
            }
        }
        setTotalcars(temp);
    };

    return (
        <DefaultLayout>
            <Row className='mt-3' justify='center'>
                <Col lg={10} sm={13} className='d-flex justify-content-center'>
                    {/* Search box */}
                    <Search
                        placeholder="Search for cars"
                        allowClear
                        enterButton="Search"
                        size="large"
                        onSearch={handleSearch}
                        onChange={(e) => setSearchValue(e.target.value)}
                        value={searchValue}
                    />
                </Col>
            </Row>

            {loading && <Spinner />}

            {/* Date Picker */}
            <Row className='mt-3' justify='center'>
                <Col lg={20} sm={24} className='d-flex justify-content-center'>
                    <RangePicker
                        showTime={{ format: 'HH:mm' }}
                        format='MMM DD yyyy HH:mm'
                        onChange={setFilter}
                    />
                </Col>
            </Row>

            {/* Car Listings */}
            <Row justify='center' gutter={16}>
                {totalCars.map(car => (
                    <Col lg={5} sm={24} xs={24} key={car._id}>
                        <div className="car p-2 bs1">
                            <img src={car.image} className="carimg" alt={car.name} />
                            <div className="car-content d-flex align-items-center justify-content-between">
                                <div className='text-left pl-2'>
                                    <p>{car.name}</p>
                                    <p>Rent Per Hour {car.rentPerHour} /-</p>
                                </div>
                                <div>
                                    <button className="btn1 mr-2"><Link to={`/booking/${car._id}`}>Book Now</Link></button>
                                </div>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>

            {/* Image Slider */}
            <Row className='mt-3' justify='center'>
                <Col lg={18} sm={20}>
                    <Carousel showArrows={true} showThumbs={false}>
                        <div>
                            <img src={carImage1} alt="Car 1" />
                        </div>
                        <div>
                            <img src={carImage2} alt="Car 2" />
                        </div>
                        <div>
                            <img src={carImage3} alt="Car 3" />
                        </div>
                    </Carousel>
                </Col>
            </Row>

            {/* Reviews Section */}
            <Row className='mt-3' justify='center'>
                <Col lg={20} sm={24}>
                    <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Customer Reviews</h2>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} lg={8}>
                            <Card
                                hoverable
                                style={{ width: '100%' }}
                                className="review-card"
                            >
                                <Meta
                                    title="Great service! Loved the car."
                                    description={<>
                                        <p>- Somesh Sharma</p>
                                        <Rate disabled defaultValue={4} />
                                    </>}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <Card
                                hoverable
                                style={{ width: '100%' }}
                                className="review-card"
                            >
                                <Meta
                                    title="Smooth booking process.Will use again."
                                    description={<>
                                        <p>- Rajat Kamat</p>
                                        <Rate disabled defaultValue={4} />
                                    </>}
                                />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={8}>
                            <Card
                                hoverable
                                style={{ width: '100%' }}
                                className="review-card"
                            >
                                <Meta
                                    title="Excellent selection of cars."
                                    description={<>
                                        <p>- Rahul Bhatia</p>
                                        <Rate disabled defaultValue={5} />
                                    </>}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>

            
        </DefaultLayout>
    );
}

export default Home;
