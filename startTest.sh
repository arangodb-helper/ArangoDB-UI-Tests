rm -rf cssTestData cssTestApps test.pid
mkdir cssTestData cssTestApps
./arangod -c arangod.conf --pid-file test.pid --log.requests-file req.log &
sleep 5
casperjs test standalone/compareAll.js
kill `cat test.pid`
