import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const Listings = (data) => {
  return (
    <main>
      <ul className="categoryListing">
        {data.data.map((listing) => (
          <h3 key={listing.id}>{listing.data.name}</h3>
        ))}
      </ul>
    </main>
  );
};

const Category = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, "listings");

        // Create a query
        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(10),
        );

        // Execute query
        const querySnap = await getDocs(q);

        const listings = [];

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listings);
        setLoading(false);
      } catch (error) {
        console.error("ERROR:", error);
        toast.error("Could not fetch listings");
      }
    };

    fetchListings();
  }, [params.categoryName]);

  let content;
  if (loading) {
    content = <Spinner />;
  } else if (listings && listings.length > 0) {
    content = <Listings data={listings} />;
  } else {
    content = <p>No listings for {params.categoryName}</p>;
  }

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {params.categoryName === "rent"
            ? "Places for Rent"
            : "Places for sale"}
        </p>
      </header>

      {content}
    </div>
  );
};

export default Category;
