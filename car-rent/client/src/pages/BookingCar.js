import React, { useState, useEffect } from "react";
import { Row, Col, Divider, DatePicker, Checkbox, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { getAllCars } from "../redux/actions/carsActions";
import moment from "moment";
import { bookCar } from "../redux/actions/bookingActions";
import StripeCheckout from "react-stripe-checkout";
import './booking.css'; 

const { RangePicker } = DatePicker;

function BookingCar({ match }) {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setCar] = useState({});
  const dispatch = useDispatch();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [conflict, setConflict] = useState(false);

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      setCar(cars.find((o) => o._id === match.params.carid));
    }
  }, [cars]);

  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour + (driver ? 30 * totalHours : 0));
  }, [driver, totalHours]);

  useEffect(() => {
    if (car.bookedTimeSlots) {
      const slots = car.bookedTimeSlots.map(slot => ({
        from: moment(slot.from),
        to: moment(slot.to)
      }));
      setBookedSlots(slots);
    }
  }, [car]);

  function selectTimeSlots(values) {
    const selectedFrom = moment(values[0]);
    const selectedTo = moment(values[1]);

 
    const isConflict = bookedSlots.some(slot =>
      (selectedFrom.isSameOrAfter(slot.from) && selectedFrom.isSameOrBefore(slot.to)) ||
      (selectedTo.isSameOrAfter(slot.from) && selectedTo.isSameOrBefore(slot.to)) ||
      (selectedFrom.isBefore(slot.from) && selectedTo.isAfter(slot.to))
    );

    setConflict(isConflict); 

    if (!isConflict) {
      setFrom(selectedFrom.format("MMM DD yyyy HH:mm"));
      setTo(selectedTo.format("MMM DD yyyy HH:mm"));
      setTotalHours(values[1].diff(values[0], "hours"));
    }
  }

  function onToken(token) {
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };

    dispatch(bookCar(reqObj));
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24} className='p-3'>
          <img src={car.image} className="carimg2 bs1 w-100" data-aos='flip-left' data-aos-duration='1500' alt="Car" />
        </Col>

        <Col lg={10} sm={24} xs={24} className="text-right">
          <Divider type="horizontal" dashed>
            Car Info
          </Divider>
          <div style={{ textAlign: "center" }}>
            <p>{car.name}</p>
            <p>{car.rentPerHour} Rent Per hour /-</p>
            <p>Fuel Type : {car.fuelType}</p>
            <p>Max Persons : {car.capacity}</p>
          </div>

          <Divider type="horizontal" dashed>
            Select Time Slots
          </Divider>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm"
            onChange={selectTimeSlots}
          />
          <br />
          <button
            className="btn1 mt-2"
            onClick={() => setShowModal(true)}
          >
            See Booked Slots
          </button>
          {from && to && (
            <div>
              <p>
                Total Hours : <b>{totalHours}</b>
              </p>
              <p>
                Rent Per Hour : <b>{car.rentPerHour}</b>
              </p>
              <Checkbox
                onChange={(e) => setDriver(e.target.checked)}
              >
                Driver Required
              </Checkbox>

              <h3>Total Amount : {totalAmount}</h3>

              <StripeCheckout
                shippingAddress
                token={onToken}
                currency='inr'
                amount={totalAmount * 100}
                stripeKey="pk_test_51IYnC0SIR2AbPxU0TMStZwFUoaDZle9yXVygpVIzg36LdpO8aSG8B9j2C0AikiQw2YyCI8n4faFYQI5uG3Nk5EGQ00lCfjXYvZ"
              >
                <button className="btn1">Book Now</button>
              </StripeCheckout>
            </div>
          )}
        </Col>

        {car.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title="Booked time slots"
          >
            <div className="p-2" >
              {car.bookedTimeSlots.map((slot, index) => (
                <button key={index} className="btn1 mt-2">
                  {slot.from} - {slot.to}
                </button>
              ))}

              <div className="text-right mt-5">
                <button
                  className="btn1"
                  onClick={() => setShowModal(false)}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </Modal>
        )}

        {/* Pop-up message for booking conflict */}
        {conflict && (
          <div className="booking-alert" id="booking-alert">
            This time slot is already booked. Please select another time slot.
          </div>
        )}
      </Row>
    </DefaultLayout>
  );
}

export default BookingCar;
