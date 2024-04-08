import Catalog from "../components/Сatalog";

const CatalogPage = (): JSX.Element => {
  const searchComponent = <div>Search widget</div>;

  return (
    <>
      {/* <Catalog searchComponent={<SearchComponent />} /> */}
      <Catalog searchComponent={searchComponent} />
    </>
  );
};

export default CatalogPage;
