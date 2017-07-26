alter procedure InitialData
as

Declare @numberRoot int;
Declare @numberAffiliated int;
Declare @numberRetailers int;
Declare @rootRetailerId int;
Declare @affiliatedRetailerId int;
Declare @randFirstNumber int;
Declare @randSecondNumber int;
Declare @randDay int;
Declare @fromAffiliatedRetailerId int;
Declare @toAffiliatedRetailerId int;

set @numberRoot = 1;

while @numberRoot <= 10
begin
	insert into RootRetailers(DisplayName) values ('RootRetailers ' + Cast(@numberRoot as varchar(5)));
	set @rootRetailerId = (SELECT IDENT_CURRENT('RootRetailers'));

	set @numberAffiliated = 1;
	while @numberAffiliated <= 10
	begin
		insert into AffiliatedRetailers(Name, RootRetailerId) values ('AffiliatedRetailers ' + Cast(@numberRoot as varchar(5)), @rootRetailerId);
		set @affiliatedRetailerId = (SELECT IDENT_CURRENT('AffiliatedRetailers'));
		set @numberRetailers = 1;
		while @numberRetailers <= 10
			begin
			insert into Retailers(RetailerName, AffiliatedRetailerId) values ('Retailers ' + Cast(@numberRetailers as varchar(5)), @affiliatedRetailerId);
			set @numberRetailers = @numberRetailers + 1;
		end
		set @numberRetailers = 1;
		while @numberRetailers <= 4
		begin 
			set @randFirstNumber = Rand()*100;
			set @randSecondNumber = Rand()*100;
			set @randDay = Rand()*30;
			if(@randDay < 1)
			begin
				set @randDay = 1;
			end
			if(@randFirstNumber < 1)
			begin
				set @randFirstNumber = 1;
			end
			if(@randFirstNumber > 99)
			begin
				set @randFirstNumber = 99;
			end

			if(@randSecondNumber < 1)
			begin
				set @randSecondNumber = 1;
			end
			if(@randSecondNumber > 99)
			begin
				set @randSecondNumber = 99;
			end

			if(@randFirstNumber = @randSecondNumber)
			begin
				set @randSecondNumber = @randSecondNumber+1; 
			end

			
			if(@numberRetailers%2 <> 0)
			begin 
				insert into Contracts(FromAffiliatedRetailerId, ToAffiliatedRetailerId, DateOfContract, ContractTypeId) values (@randFirstNumber, @randSecondNumber, '04/' + Cast(@randDay as varchar(2))+'/2017', 1);
			end
			if(@numberRetailers%2 = 0)
			begin
				insert into Contracts(FromAffiliatedRetailerId, ToAffiliatedRetailerId, DateOfContract, ContractTypeId) values (@randFirstNumber, @randSecondNumber, '04/' + Cast(@randDay as varchar(2))+'/2017', 2);
			end

			set @numberRetailers = @numberRetailers + 1;
		end

		set @numberAffiliated = @numberAffiliated + 1;
	end

	set @numberRoot = @numberRoot + 1;
end