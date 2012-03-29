<html>
<head>
    <title>Demo Example</title>
</head>
<body>
<h1>Example of Books List from Mysql</h1>
<?php
    $con = mysql_connect("localhost","papaonle_test","0MRDgnrDu9");
    if (!$con)
    {
        die("Could not connect: " . mysql_error());
    }
    
    mysql_select_db("papaonle_test", $con);    
 
    $result = mysql_query("SELECT * FROM books");
    echo "<table>";
    echo "<tr>";
    echo "<th>Title</th>";
    echo "<th>Author</th>";
    echo "<th>Publisher</th>";
    echo "<th>Comment</th>";
    echo "<th>Price</th>";            
    echo "</tr>";
    while($row = mysql_fetch_array($result))
    {
    	echo "<tr>";
        echo "<td>".$row["title"]."</td>";
        echo "<td>".$row["author"]."</td>";
        echo "<td>".$row["publisher"]."</td>";
        echo "<td>".$row["comment"]."</td>";
        echo "<td>".$row["price"]."</td>";
        echo "</tr>";
    }
    echo "</table>";
    mysql_close($con);
?>
</body>
</html>

