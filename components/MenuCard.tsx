"use client";

import { api } from "@/utilities/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import {
  Card,
  Button,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
} from "react-bootstrap";
import { useAuth } from "./AuthContextProvider";
import { useRouter } from "next/navigation";
import qs from "qs";

interface MenuCardProps {
  id: number;
  name: string;
  description: string;
  image: string;
  price?: number;
}

export default function MenuCard({
  id,
  name,
  description,
  image,
  price,
}: MenuCardProps) {
  // for redirecting to login page if user is not logged in
  const router = useRouter();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // add item to cart
  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["cart-items", id],
    mutationFn: async (newItem: {
      user: number;
      item: number;
      quantity: number;
    }) => {
      const response = await api("/cart-items", {
        body: JSON.stringify(newItem),
      });
      return response;
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["cart-items"] });
    },
  });

  const cartItemQuery = qs.stringify(
    {
      where: {
        and: [
          {
            user: {
              equals: user?.id,
            },
          },
          {
            item: {
              equals: id,
            },
          },
        ],
      },
    },
    { addQueryPrefix: false }
  );

  // check if item is already in the cart
  // if it is, disable the button
  const { data: cartItems } = useQuery({
    queryKey: ["cart-items", id],
    queryFn: async () => {
      const response = await api(`/cart-items/count?${cartItemQuery}`, {
        method: "GET",
      });
      return response;
    },
  });

  const addNewItem = useCallback(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    mutate({ user: user.id, item: id, quantity: 1 });
  }, [id, mutate, router, user]);

  if (isError) {
    throw error;
  }

  return (
    <Card className="h-100">
      <CardImg variant="top" src={image} alt={name} />
      <CardBody className="d-flex h-100 flex-column">
        <div className="mb-3">
          <CardTitle>{name}</CardTitle>
          <CardText>{description}</CardText>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          {price !== undefined && (
            <span className="fw-normal text-black fs-4">
              ₱{price.toFixed(2)}
            </span>
          )}
          <Button
            variant="primary"
            onClick={addNewItem}
            disabled={isPending || (!!user && cartItems?.totalDocs > 0)}
            aria-disabled={isPending || (!!user && cartItems?.totalDocs > 0)}
          >
            {user && cartItems?.totalDocs > 0
              ? "Item in Cart"
              : isPending
                ? "Adding..."
                : "Add to Cart"}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
