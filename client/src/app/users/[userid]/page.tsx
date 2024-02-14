type UserPageProps = {
  params: {
    userid: string;
  };
};

export default function UserPage({ params }: UserPageProps) {
  return <div>User Page</div>;
}
