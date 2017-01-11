## Synopsis


## API Reference

Under Dev

## Requirements

* [NodeJs](http://nodejs.org) >= 6.x

## Configurations

```sh
setup auth.js with API Keys for Google/Twitter/LinkedIn
```


## Install

```sh
$ git clone git://github.com/trenchproject/ebm.git
$ npm install
```
```sh
$ npm start
```

Then visit [http://localhost:3000/](http://localhost:3000/)

## Communication

Once filtering is done via the microclim.org site, an email will be delivered to your mailbox with the details of the extracted file.

[![N|Solid](http://microclim.org/images/email-corres.png)]()


## Usage 

Note the link from the previous section, and to use the NetCDF file, see the vignette below

```sh
# author - Aji John
# credit - http://geog.uoregon.edu/bartlein/courses/geog607/Rmd/netCDF_01.htm


library(chron)
library(RColorBrewer)
library(lattice)
library(ncdf4)

url="http://s3-us-west-2.amazonaws.com/microclim/58741743311c3c0e99dac83d/BGAP_output_interval-daily_aggregation-avg_times-19810101-19810122_created-2017-01-09-2316.nc"
dfile="BGAP_output_interval-daily_aggregation-avg_times-19810101-19810122_created-2017-01-09-2316.nc"

download.file(url, destfile=dfile)

# open a NetCDF file
ncin <- nc_open(dfile)
print(ncin)

lon <- ncvar_get(ncin, "lon")
nlon <- dim(lon)
head(lon)

lat <- ncvar_get(ncin, "lat", verbose = F)
nlat <- dim(lat)
head(lat)

#Number of colums - would be 2 by 2 matrix
print(c(nlon, nlat))

# Number of days multiplied by the granularity (hourly/daily etc)
t <- ncvar_get(ncin, "time")
tunits <- ncatt_get(ncin, "time", "units")
nt <- dim(t)

dname <- "BGAP"  # note: specific to the variabe being s  seclected
tmp.array <- ncvar_get(ncin, dname)

dlname <- ncatt_get(ncin, dname, "long_name")
dunits <- ncatt_get(ncin, dname, "units")
fillvalue <- ncatt_get(ncin, dname, "_FillValue")
dim(tmp.array)

# print the global variables
# reconfirm what was used to filter

created <- ncatt_get(ncin, 0, "createdOn")
startdate <- ncatt_get(ncin, 0, "startdate")
enddate <- ncatt_get(ncin, 0, "enddate")
varname <- ncatt_get(ncin, 0, "varname")

```

## Tests

```sh
$ npm test
```

## License

Apache