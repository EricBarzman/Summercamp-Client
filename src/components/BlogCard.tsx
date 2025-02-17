import { CardProps } from "@/types";
import { Card } from "./Card";

export const BlogCard = (props: Readonly<CardProps>) => <Card {...props} basePath="blog" />