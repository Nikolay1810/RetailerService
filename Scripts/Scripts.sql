create database Retailer;
use Retailer;

create table RootRetailers(
Id int identity primary key,
DisplayName varchar(60)
);

create table AffiliatedRetailers(
Id int identity primary key,
Name varchar(80),
RootRetailerId int,
foreign key (RootRetailerId) references RootRetailers(Id)
);

create table Retailers(
Id int identity primary key,
RetailerName varchar(60),
AffiliatedRetailerId int,
foreign key (AffiliatedRetailerId) references AffiliatedRetailers(Id),
);

create table NestedAffiliatedRetailers(
Id int identity primary key,
RetailerId int,
AffiliatedRetailerId int,
foreign key (RetailerId) references Retailers(Id),
foreign key (AffiliatedRetailerId) references AffiliatedRetailers(Id)
);

create table ContractType(
Id int identity primary key,
TypeName varchar(20)
);

create table Contracts(
Id int identity primary key,
FromAffiliatedRetailerId int,
ToAffiliatedRetailerId int,
DateOfContract date,
ContractTypeId int,
foreign key (ContractTypeId) references ContractType(Id),
foreign key (FromAffiliatedRetailerId) references AffiliatedRetailers(Id),
foreign key (ToAffiliatedRetailerId) references AffiliatedRetailers(Id)
);

insert into ContractType(TypeName) values ('Valid');
insert into ContractType(TypeName) values ('Inactive');


exec InitialData;



delete from Retailers;
delete from Contracts;
delete from AffiliatedRetailers;
delete from RootRetailers;


DBCC CHECKIDENT (RootRetailers, RESEED, 0);
DBCC CHECKIDENT (AffiliatedRetailers, RESEED, 0);
DBCC CHECKIDENT (Retailers, RESEED, 0);
DBCC CHECKIDENT (Contracts, RESEED, 0);



